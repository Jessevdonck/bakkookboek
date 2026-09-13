# Bakkookboek

Een klein Next.js-sitetje met de broodrecepten uit het Panasonic
SD-YR2550SXE bakkookboek, zodat je ze makkelijk kan opzoeken op je
telefoon of laptop terwijl je aan het bakken bent.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Een recept toevoegen (geen technische kennis nodig)

Elk recept is een eigen tekstbestand in [`content/recipes/`](content/recipes/)
— geen code, geen TypeScript. Je kan een recept toevoegen via de
GitHub-website, zonder iets te installeren:

1. Ga naar de map [`content/recipes`](content/recipes) op GitHub.
2. Open [`_TEMPLATE.yaml`](content/recipes/_TEMPLATE.yaml), klik op het
   potlood-icoontje ("Edit this file") en kopieer de inhoud.
3. Ga terug naar de map, klik **Add file → Create new file**, en geef
   het een naam als `mijn-nieuwe-brood.yaml` (kleine letters,
   koppeltekens, geen spaties — deze naam bepaalt de link naar het
   recept).
4. Plak de tekst, vul je eigen recept in (het sjabloon legt elk veld
   uit), en klik onderaan op de groene knop **Commit changes...**.
5. Klaar. De site bouwt automatisch opnieuw en je recept staat binnen
   een minuut live.

Een ingevuld voorbeeld, zoals [`content/recipes/puur-spelt-ambacht.yaml`](content/recipes/puur-spelt-ambacht.yaml):

```yaml
title: "Puur Spelt-Ambacht"
category: "Spelt" # Wit brood, Volkoren, Rogge, Spelt of Meergranen
description: "Een licht verteerbaar brood met een milde, nootachtige smaak."

yeast:
  amount: "5 g"
  item: "Bruggeman gist"

panIngredients:
  - amount: "300 g"
    item: "Aveve Volspeltmeel"
  - amount: "310 ml"
    item: "Koud water"

machine:
  menu: "13 (Speltbrood)"
  size: "L"
```

De homepage, de zoekfunctie, de categoriefilters en de receptpagina
pikken elk nieuw bestand automatisch op.

Liever lokaal in een code-editor werken? Dat kan natuurlijk ook — het
zijn gewone bestanden in `content/recipes/`. Het volledige datamodel
staat gedocumenteerd in [`src/types/recipe.ts`](src/types/recipe.ts).

De algemene gebruiksaanwijzing (stappenplan, machine-intro) staat apart
in [`src/data/general-info.ts`](src/data/general-info.ts) — dat is wel
gewoon TypeScript, omdat die zelden verandert.

## Projectstructuur

```
content/recipes/          # elk recept is een .yaml-bestand — hier voeg je toe
  _TEMPLATE.yaml           # kopieer dit voor een nieuw recept
src/
  types/recipe.ts         # datamodel (Recipe, Ingredient, ...)
  data/general-info.ts    # algemene gebruiksaanwijzing
  lib/recipes.ts          # leest en valideert content/recipes/*.yaml
  components/             # herbruikbare UI (kaart, ingrediëntenlijst, ...)
  app/page.tsx             # homepage met zoeken + categoriefilter
  app/recepten/[slug]/     # receptpagina
  app/instructies/         # gebruiksaanwijzing-pagina
```

## Gratis online zetten (GitHub Pages)

Dit project is al helemaal ingericht voor GitHub Pages: `next.config.ts`
exporteert een pure statische site en past automatisch het juiste
basispad toe, en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
bouwt en publiceert de site telkens je naar `main` pusht.

1. Maak een (lege) GitHub-repository aan via <https://github.com/new>
   — bijvoorbeeld genaamd `bakkookboek`. **Voeg geen README/`.gitignore`
   toe**, dit project heeft die al.
2. Koppel je lokale repo eraan en push:

   ```bash
   git remote add origin https://github.com/<jouw-gebruikersnaam>/bakkookboek.git
   git push -u origin main
   ```

3. Ga in je nieuwe repo naar **Settings → Pages** en zet **Source** op
   **GitHub Actions**.
4. Dat is alles. Ga naar het **Actions**-tabblad om de build te volgen;
   na ongeveer een minuut staat de site live op
   `https://<jouw-gebruikersnaam>.github.io/bakkookboek/`.

Elke volgende `git push` naar `main` bouwt en publiceert de site
automatisch opnieuw.

> De workflow leidt het basispad (`/bakkookboek`) automatisch af uit de
> repositorynaam — hernoem je de repo, dan werkt het gewoon opnieuw
> zonder dat je iets hoeft aan te passen. Alleen als je de repo
> `<jouw-gebruikersnaam>.github.io` noemt (een user-site op de root van
> je domein) laat de workflow het basispad automatisch leeg.

### Alternatief: Vercel of Netlify

Het project bouwt met `npm run build` naar een statische `out/`-map,
dus het werkt ook op elk ander gratis platform voor statische sites
(Vercel, Netlify, Cloudflare Pages, ...). Verbind daar gewoon je
GitHub-repository; deze platforms herkennen Next.js automatisch en
hebben geen extra configuratie nodig.
