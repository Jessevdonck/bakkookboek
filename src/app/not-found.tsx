import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-4xl" aria-hidden>
        🍞
      </span>
      <h1 className="font-display text-2xl font-semibold">Pagina niet gevonden</h1>
      <p className="text-muted">Deze pagina bestaat niet (meer).</p>
      <Link href="/" className="mt-2 font-medium text-accent hover:underline">
        Terug naar alle recepten
      </Link>
    </div>
  );
}
