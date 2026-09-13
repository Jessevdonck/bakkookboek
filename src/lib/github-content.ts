/**
 * Minimal wrapper around the GitHub Contents API — just enough to check
 * whether a file exists and to create one. Used by the /admin form's
 * server action so a new recipe becomes a real, versioned commit instead
 * of living in some separate database.
 *
 * Requires two server-only environment variables (set in your host's
 * dashboard, never committed):
 *   GH_TOKEN — a fine-grained personal access token scoped to this repo
 *              only, with "Contents: Read and write" permission.
 *   GH_REPO  — "owner/repo", e.g. "Jessevdonck/bakkookboek".
 */

function repoConfig() {
  const token = process.env.GH_TOKEN;
  const repo = process.env.GH_REPO;
  if (!token || !repo) {
    throw new Error(
      "GH_TOKEN en/of GH_REPO ontbreken. Zet deze in de environment variables van je hosting (zie README).",
    );
  }
  return { token, repo, branch: process.env.GH_BRANCH || "main" };
}

async function githubFetch(path: string, init?: RequestInit) {
  const { token } = repoConfig();
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });
}

export async function fileExists(pathInRepo: string): Promise<boolean> {
  const { repo, branch } = repoConfig();
  const res = await githubFetch(
    `/repos/${repo}/contents/${pathInRepo}?ref=${branch}`,
  );
  if (res.status === 404) return false;
  if (!res.ok) {
    throw new Error(`GitHub API-fout bij het controleren van ${pathInRepo} (${res.status}).`);
  }
  return true;
}

export async function createFile(
  pathInRepo: string,
  content: string,
  commitMessage: string,
): Promise<void> {
  const { repo, branch } = repoConfig();
  const res = await githubFetch(`/repos/${repo}/contents/${pathInRepo}`, {
    method: "PUT",
    body: JSON.stringify({
      message: commitMessage,
      // btoa handles UTF-8 poorly; encode via Buffer instead.
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API-fout bij het aanmaken van ${pathInRepo} (${res.status}): ${body}`);
  }
}
