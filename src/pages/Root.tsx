import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Spinner } from '../components/Spinner';

export const Root = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="overflow-auto">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>

      <Nav />
      <ScrollRestoration />
    </div>
  );
};
