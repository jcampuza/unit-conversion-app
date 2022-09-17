import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazier } from './lib/lazier';
import { Root } from './pages/Root';
import { Spinner } from './components/Spinner';
import './index.css';

const Home = lazier(() => import('./pages/Home').then((c) => c.Home));
const Convert = lazier(() => import('./pages/Convert').then((c) => c.Convert));
const OneRepMax = lazier(() => import('./pages/OneRepMax').then((c) => c.OneRepMax));
const Settings = lazier(() => import('./pages/Settings').then((c) => c.Settings));

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'convert',
        element: <Convert />,
      },
      {
        path: 'max',
        element: <OneRepMax />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Spinner />} />
  </React.StrictMode>
);
