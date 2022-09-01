import React from 'react';

export const lazier = <T extends React.ComponentType<any>>(componentImport: () => Promise<T>) => {
  return React.lazy(() => componentImport().then((c) => ({ default: c })));
};
