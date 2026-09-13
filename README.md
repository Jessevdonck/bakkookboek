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

Twee manieren, allebei zonder code te schrijven:

### Optie A — het formulier op /admin (aanbevolen)

De site heeft een ingebouwd formulier op `/admin`: titel, categorie,
ingrediënten met een knop om er meer toe te voegen, machine-instellingen
— gewone invulvelden, geen bestandsformaat om te leren. Achter een
wachtwoord, want dit formulier commit rechtstreeks naar de GitHub-repo.

Bij opslaan gebeurt er dit:
1. Het formulier stuurt de gegevens naar een server-functie
   ([`src/app/admin/actions.ts`](src/app/admin/actions.ts)).
2. Die zet het om in een nette `content/recipes/<titel>.yaml` en commit
   dat bestand rechtstreeks naar GitHub via hun API.
3. Die commit triggert automatisch een nieuwe deploy (zie hieronder) —
   binnen ongeveer een minuut staat het recept live.

Dit vereist twee instellingen bij je hosting (zie **Online zetten**
verderop): `ADMIN_PASSWORD` en `GH_TOKEN`/`GH_REPO`. Zonder die
instellingen werkt de rest van de site gewoon, maar geeft `/admin` een
duidelijke foutmelding in plaats van te crashen.

### Optie B — rechtstreeks een bestand aanmaken op GitHub

Elk recept is ook gewoon een eigen tekstbestand in
[`content/recipes/`](content/recipes/). Handig als je liever geen
wachtwoord onthoudt, of het formulier niet is ingesteld:

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
  lib/recipe-yaml.ts      # zet formuliergegevens om naar een .yaml-bestand
  lib/github-content.ts   # praat met de GitHub API (bestand aanmaken/checken)
  lib/slugify.ts          # titel -> bestandsnaam/URL
  components/             # herbruikbare UI (kaart, ingrediëntenlijst, ...)
  app/page.tsx             # homepage met zoeken + categoriefilter
  app/recepten/[slug]/     # receptpagina
  app/instructies/         # gebruiksaanwijzing-pagina
  app/admin/               # formulier om een recept toe te voegen
```

## Online zetten (Vercel)

Deze site heeft een server-functie nodig voor het `/admin`-formulier
(die praat met de GitHub API), dus een puur statische host zoals GitHub
Pages volstaat niet meer. **Vercel** is gratis voor persoonlijk gebruik
en ondersteunt dit soort server-functies rechtstreeks, met automatische
deploys bij elke push:

1. Push deze repository naar GitHub (zie hierboven als dat nog niet is
   gebeurd).
2. Ga naar <https://vercel.com>, log in met je GitHub-account (gratis
   Hobby-plan) en klik **Add New… → Project**, en kies je repo. Vercel
   herkent Next.js automatisch — niets aan te passen, klik **Deploy**.
3. Ga naar **Settings → Environment Variables** van het project en
   voeg toe (zie [`.env.local.example`](.env.local.example)):
   - `ADMIN_PASSWORD` — het wachtwoord voor `/admin`.
   - `GH_TOKEN` — een GitHub-token (zie hieronder).
   - `GH_REPO` — `<jouw-gebruikersnaam>/bakkookboek`.
4. Doe een nieuwe deploy zodat de variabelen actief worden (**Deployments
   → ⋯ → Redeploy**, of gewoon opnieuw pushen).

Je site staat dan op een gratis `....vercel.app`-adres, en elke
`git push` naar `main` (ook eentje die het `/admin`-formulier zelf
maakt) triggert automatisch een nieuwe deploy.

### Een GitHub-token aanmaken voor `GH_TOKEN`

1. Ga naar <https://github.com/settings/personal-access-tokens/new>.
2. Kies **Only select repositories** en selecteer enkel deze repo.
3. Onder **Repository permissions**, zet **Contents** op
   **Read and write**. Meer heeft de site niet nodig.
4. Genereer het token en plak het als `GH_TOKEN` in Vercel (het is maar
   één keer zichtbaar).

### Zonder het /admin-formulier?

Werk je liever alleen via optie B hierboven (rechtstreeks een bestand
aanmaken op GitHub)? Dan is een server-functie niet nodig en kan je de
site ook gewoon als statische export hosten. Zet daarvoor
`output: "export"` terug in `next.config.ts` en gebruik een host als
GitHub Pages, Netlify of Cloudflare Pages.
