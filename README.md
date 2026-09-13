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

## Gratis online zetten (Vercel)

Deze app is een standaard Next.js-project, wat Vercel (de makers van
Next.js) gratis host voor persoonlijke projecten.

1. Zet dit project in een GitHub-repository (bv. via `gh repo create`
   of de GitHub-website), en push je code:

   ```bash
   git add -A
   git commit -m "Initial bakkookboek site"
   git remote add origin <jouw-repo-url>
   git push -u origin main
   ```

2. Ga naar <https://vercel.com>, log in met je GitHub-account (gratis
   Hobby-plan) en klik op **Add New… → Project**.
3. Selecteer je `bakkookboek`-repository. Vercel herkent Next.js
   automatisch — je hoeft niets aan de instellingen te wijzigen.
4. Klik **Deploy**. Na ongeveer een minuut krijg je een gratis URL
   zoals `bakkookboek.vercel.app`.

Elke keer dat je daarna naar `main` pusht, bouwt Vercel de site
automatisch opnieuw.

### Alternatief: Netlify of GitHub Pages

Het project bouwt met `npm run build` en start met `npm run start`,
dus het werkt ook op elk ander platform dat Next.js ondersteunt (bv.
Netlify's gratis tier). Voor een puur statische export (geschikt voor
GitHub Pages) zou je `output: "export"` in `next.config.ts` moeten
zetten — dat kan met deze site, aangezien alle pagina's statisch zijn.
