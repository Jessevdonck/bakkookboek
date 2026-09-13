import type { Recipe } from "@/types/recipe";

/**
 * All recipes for the Panasonic SD-YR2550SXE bakkookboek.
 *
 * To add a new recipe: copy an existing object, give it a unique `slug`
 * and the next `number`, and fill in the fields. That's it — the
 * homepage and the recipe detail page pick it up automatically.
 */
export const recipes: Recipe[] = [
  {
    slug: "frans-krokant-brood",
    number: 1,
    title: "Frans Krokant Brood",
    category: "Wit brood",
    description:
      "Klassiek witbrood met een knapperige korst en een luchtige kruim. Bootst traditionele Franse rijstijden na.",
    yeast: {
      amount: "4 g",
      item: "Bruggeman gist",
      note: "ca. 1/2 zakje of 1 afgestreken koffielepel",
    },
    panIngredients: [
      { amount: "400 g", item: "Aveve Classic broodmix Frans krokant" },
      {
        amount: "10 g",
        item: "Roomboter",
        note: "optioneel, voor zachtere kruim",
      },
      { amount: "260 ml", item: "Koud water" },
    ],
    machine: {
      menu: "10 (Frans Brood)",
      note: "Duurt ongeveer 5 uur en 40 minuten vanwege de lange rijstijd.",
    },
  },
  {
    slug: "dagelijks-grijs-brood",
    number: 2,
    title: "Dagelijks Grijs Brood (Licht Volkoren)",
    category: "Volkoren",
    yeast: {
      amount: "5 g",
      item: "Bruggeman gist",
    },
    panIngredients: [
      { amount: "250 g", item: "Aveve Surfina tarwebloem" },
      { amount: "250 g", item: "Aveve Voltarwemeel fijn" },
      { amount: "15 g", item: "Roomboter", note: "of 1 eetlepel olie" },
      { amount: "8 g", item: "Zout", note: "aan de rand strooien" },
      { amount: "320 ml", item: "Koud water" },
    ],
    machine: {
      menu: "1 (Basisbrood)",
      size: "L",
      crust: "Medium of Dark naar wens",
    },
  },
  {
    slug: "authentiek-rogge-tarwebrood",
    number: 3,
    title: "Authentiek Rogge-Tarwebrood",
    category: "Rogge",
    description:
      "Een karaktervol, donkerder brood met een licht zurige, diepe smaak dankzij het roggemeel.",
    yeast: {
      amount: "6 g",
      item: "Bruggeman gist",
    },
    panNote: "Plaats eerst de speciale roggekneedhaak in het blik!",
    panIngredients: [
      { amount: "350 g", item: "Aveve Surfina tarwebloem" },
      { amount: "150 g", item: "Aveve Volroggemeel" },
      { amount: "8 g", item: "Zout" },
      {
        amount: "1 eetlepel",
        item: "Honing of suiker",
        note: "helpt bij het rijzen van rogge",
      },
      { amount: "330 ml", item: "Koud water" },
    ],
    machine: {
      menu: "11 (Roggebrood)",
      note: "De machine kneedt heel specifiek om de rogge niet te overbelasten.",
    },
  },
  {
    slug: "puur-spelt-ambacht",
    number: 4,
    title: "Puur Spelt-Ambacht",
    category: "Spelt",
    description: "Een licht verteerbaar brood met een milde, nootachtige smaak.",
    yeast: {
      amount: "5 g",
      item: "Bruggeman gist",
    },
    panIngredients: [
      { amount: "300 g", item: "Aveve Volspeltmeel" },
      {
        amount: "200 g",
        item: "Aveve Surfina tarwebloem",
        note: "essentieel voor het volume!",
      },
      { amount: "8 g", item: "Zout" },
      { amount: "1 eetlepel", item: "Olie" },
      { amount: "310 ml", item: "Koud water" },
    ],
    machine: {
      menu: "13 (Speltbrood)",
      size: "L",
    },
  },
  {
    slug: "grof-meergranenbrood",
    number: 5,
    title: "Grof Meergranenbrood",
    category: "Meergranen",
    description:
      "Een stevig, donkerder brood boordevol granen, zaden en vezels. Perfect voor een stevige lunch.",
    yeast: {
      amount: "5 g",
      item: "Bruggeman droge gist",
    },
    panIngredients: [
      { amount: "500 g", item: "Aveve Classic broodmix grof meergranenbrood" },
      {
        amount: "15-20 g",
        item: "Roomboter",
        note: "of 1 eetlepel plantaardige olie",
      },
      { amount: "300 ml", item: "Koud kraanwater" },
    ],
    machine: {
      // Bron-PDF was hier onduidelijk ("Menu: 1 Menu 7") — vermoedelijk
      // Menu 7. Controleer dit gerust tegen het menu-overzicht van je
      // machine en pas aan indien nodig.
      menu: "7",
      size: "L",
    },
    tip: "Duurt 5u — dat geeft de zwaardere granen extra tijd om vocht op te nemen voor een zachter resultaat.",
  },
  {
    slug: "wit-boerenbrood",
    number: 6,
    title: "Wit Boerenbrood",
    category: "Wit brood",
    description:
      "Een klassiek, volumineus witbrood met een volle, traditionele smaak. Ideaal voor dagelijks gebruik.",
    yeast: {
      amount: "4,5 g",
      item: "Bruggeman droge gist",
    },
    panIngredients: [
      { amount: "500 g", item: "Aveve Classic broodmix wit boerenbrood" },
      { amount: "15 g", item: "Roomboter", note: "optioneel" },
      { amount: "290 ml", item: "Koud kraanwater" },
    ],
    machine: {
      menu: "1 (Basisbrood)",
      size: "L",
      crust: "Medium of Dark (naar keuze)",
    },
  },
];
