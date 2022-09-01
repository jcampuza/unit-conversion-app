import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from './Spinner';
import { Nav } from './Nav';
import { lazier } from '../lib/lazier';

const Home = lazier(() => import('./Home').then((c) => c.Home));

const Convert = lazier(() => import('./Convert').then((c) => c.Convert));

const OneRepMax = lazier(() => import('./OneRepMax').then((c) => c.OneRepMax));

const Settings = lazier(() => import('./Settings').then((c) => c.Settings));

export function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <div className="overflow-auto">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="convert" element={<Convert />}></Route>
              <Route path="max" element={<OneRepMax />}></Route>
              <Route path="settings" element={<Settings />}></Route>
            </Routes>
          </Suspense>
        </div>

        <Nav />
      </div>
    </BrowserRouter>
  );
}
