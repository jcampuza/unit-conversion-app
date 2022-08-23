export const settingsKey = '$$n$$';
export const fix = (value: number) => Number(value.toFixed(2));

export interface Settings {
  kgs: number;
  lbs: number;
  max: number;
  bench: number;
  squat: number;
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
