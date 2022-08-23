import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Convert } from './Convert';
import { Home } from './Home';
import { Nav } from './Nav';
import { Settings } from './Settings';

export function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <div className="overflow-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="convert" element={<Convert />}></Route>
            <Route path="settings" element={<Settings />}></Route>
          </Routes>
        </div>

        <Nav />
      </div>
    </BrowserRouter>
  );
}
