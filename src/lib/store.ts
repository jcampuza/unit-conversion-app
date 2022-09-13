import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import { createStore, persistMiddleware } from './createStore';

export const persistKey = '$$n$$';

export enum Mode {
  lbs = 'lbs',
  kgs = 'kgs',
}

export interface State {
  kgs: number;
  lbs: number;
  max: number;
  bench: number;
  squat: number;
  deadlift: number;
  mode: Mode;
  lastUpdatedTimestamp: number | null;
}

const DEFAULTS: State = {
  kgs: 0,
  lbs: 0,
  max: 0,
  bench: 0,
  squat: 0,
  deadlift: 0,
  mode: Mode.lbs,
  lastUpdatedTimestamp: null,
};

export const getStateFromStorage = (): State => {
  const item = localStorage.getItem(persistKey);
  if (!item) {
    return DEFAULTS;
  }

  const parsed = JSON.parse(item) as State;

  return {
    ...DEFAULTS,
    ...parsed,
  };
};

export const store = persistMiddleware(persistKey)(createStore(getStateFromStorage()));

export const useStore = <T>(selector: (state: State) => T) => {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    selector
  );
};

export const useUpdateStore = () => store.setState;

export const useStoreWithUpdater = <T>(selector: (state: State) => T) => {
  return [useStore(selector), useUpdateStore()] as const;
};
