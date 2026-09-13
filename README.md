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

## Een recept toevoegen of aanpassen

Alle recepten staan in één bestand: [`src/data/recipes.ts`](src/data/recipes.ts).
Kopieer een bestaand object, geef het een uniek `slug` en het volgende
`number`, en vul de velden in. De homepage, de filters en de
receptpagina pikken het automatisch op — je hoeft nergens anders iets
aan te passen.

De vorm van een recept staat gedocumenteerd in
[`src/types/recipe.ts`](src/types/recipe.ts). Kort samengevat:

```ts
{
  slug: "mijn-nieuw-brood",       // uniek, gebruikt in de URL
  number: 7,                       // volgnummer
  title: "Mijn Nieuw Brood",
  category: "Wit brood",           // zie Category in recipe.ts
  description: "Korte intro.",     // optioneel
  yeast: { amount: "5 g", item: "Bruggeman gist" },
  panNote: "Plaats eerst de X kneedhaak!", // optioneel
  panIngredients: [
    { amount: "500 g", item: "Bloem" },
    { amount: "300 ml", item: "Koud water" },
  ],
  machine: { menu: "1 (Basisbrood)", size: "L", crust: "Medium" },
  tip: "Een extra baktip.",        // optioneel
}
```

Wil je een nieuwe categorie? Voeg die toe aan de `Category`-union in
`src/types/recipe.ts` en aan de volgorde-array in
`src/lib/recipes.ts`.

De algemene gebruiksaanwijzing (stappenplan, machine-intro) staat los
in [`src/data/general-info.ts`](src/data/general-info.ts).

## Projectstructuur

```
src/
  types/recipe.ts        # datamodel (Recipe, Ingredient, ...)
  data/recipes.ts         # alle recepten — hier voeg je content toe
  data/general-info.ts    # algemene gebruiksaanwijzing
  lib/recipes.ts          # helpers: alle recepten, per slug, per categorie
  components/             # herbruikbare UI (kaart, ingrediëntenlijst, ...)
  app/page.tsx             # homepage met categoriefilter
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
