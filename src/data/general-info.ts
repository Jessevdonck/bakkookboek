/**
 * General usage info for the bread machine, shown on the /instructies page.
 * Separate from recipes.ts because it describes the machine, not a bake.
 */
export const machineModel = "Panasonic SD-YR2550SXE";

export const machineIntro =
  "De Panasonic SD-YR2550SXE beschikt over een automatische gistdispenser in het deksel. De machine voegt de gist op exact het juiste moment toe. Bij Panasonic-machines bouw je de ingrediënten in het bakblik omgekeerd op ten opzichte van andere merken: eerst de droge ingrediënten (bloem/meel), daarna pas het water.";

export type UsageStep = {
  title: string;
  description: string;
};

export const usageSteps: UsageStep[] = [
  {
    title: "Gist plaatsen",
    description:
      "Open de kleine klep bovenop het deksel. Doe de droge Bruggeman gist in de speciale ronde gistdispenser. Sluit de klep.",
  },
  {
    title: "Bakblik vullen",
    description:
      "Haal het bakblik uit de machine. Plaats de juiste kneedhaak (gebruik de speciale roggekneedhaak voor het roggebrood, de standaardhaak voor de rest).",
  },
  {
    title: "Volgorde in het blik",
    description:
      "Strooi eerst de bloem/meel (en eventueel zout/boter) in het blik. Giet er als laatste het koude water voorzichtig omheen (koud kraanwater is perfect).",
  },
  {
    title: "Programma starten",
    description:
      "Plaats het blik terug, sluit het grote deksel. Selecteer het Menu-nummer, kies het broodformaat (M of L) en eventueel de korstkleur. Druk op Start.",
  },
];
