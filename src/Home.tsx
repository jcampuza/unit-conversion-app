import { useEffect, useState } from 'react';
import { fix, getSettings, KG_COEFFICIENT, updateSettings } from './utils';

const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

export function Home() {
  const settings = getSettings();
  const [max, setMax] = useState(settings.max ?? 0);

  const maxInKg = max / KG_COEFFICIENT;

  const useSquatMax = () => {
    const { squat } = getSettings();
    setMax(squat);
  };

  const useBenchMax = () => {
    const { bench } = getSettings();
    setMax(bench);
  };

  useEffect(() => {
    updateSettings({
      max: max,
    });
  }, [max]);

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max (lbs)</span>

          <input
            value={max}
            type="number"
            pattern="[0-9]*"
            onChange={(e) => setMax(Number(e.currentTarget.value))}
          />
        </label>
        <div className="flex gap-2">
          <button onClick={useSquatMax}>Use Squat Max</button>
          <button onClick={useBenchMax}>Use Bench Max</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>%</th>
            <th>kg</th>
            <th>kg -&gt; lbs</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {PERCENTAGES.map((percentage) => {
            const roundedAmountKg = fix(
              Math.round((max * percentage) / KG_COEFFICIENT / 2.5) * 2.5
            );
            const roundedAmountLbs = fix(roundedAmountKg * KG_COEFFICIENT);
            const actualPercent = fix(roundedAmountKg / maxInKg);

            return (
              <tr key={percentage}>
                <td>{percentage * 100}%</td>
                <td>{roundedAmountKg}</td>
                <td>{roundedAmountLbs}</td>
                <td>{actualPercent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
