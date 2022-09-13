export type Store<T> = ReturnType<typeof createStore<T>>;

export const createStore = <T>(initialState: T) => {
  let currentState = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => currentState,

    setState: (update: (currentState: T) => T) => {
      currentState = update(currentState);
      listeners.forEach((listener) => listener());
    },

    subscribe: (callback: () => void) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
  };
};

export const persistMiddleware =
  (key: string) =>
  <T>(store: Store<T>) => {
    let timeoutId: NodeJS.Timeout;

    return {
      ...store,
      setState: (update: (currentState: T) => T) => {
        clearTimeout(timeoutId);

        store.setState(update);

        timeoutId = setTimeout(() => {
          localStorage.setItem(key, JSON.stringify(store.getState()));
        });
      },
    };
  };
