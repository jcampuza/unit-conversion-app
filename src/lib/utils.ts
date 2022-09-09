export const settingsKey = '$$n$$';
export const KG_COEFFICIENT = 2.20462;

export enum Mode {
  lbs = 'lbs',
  kgs = 'kgs',
}

export interface Settings {
  kgs: number;
  lbs: number;
  max: number;
  bench: number;
  squat: number;
  mode: Mode;
  lastUpdatedTimestamp: number | null;
}

export const getSettings = () => {
  const item = localStorage.getItem(settingsKey);
  if (!item) {
    return {
      kgs: 0,
      lbs: 0,
      max: 0,
      bench: 0,
      squat: 0,
      mode: Mode.lbs,
      lastUpdatedTimestamp: null,
    } as Settings;
  }

  return JSON.parse(item) as Settings;
};

export const updateSettings = (settings: Partial<Settings>) => {
  const curr = getSettings();

  localStorage.setItem(
    settingsKey,
    JSON.stringify({
      ...curr,
      ...settings,
    })
  );
};

export const fix = (value: number) => Number(value.toFixed(1));

export const isNumeric = (str: string) => {
  if (typeof str != 'string') return false;
  return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
};
