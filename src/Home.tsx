import { ChangeEvent, useEffect, useState } from 'react';
import { getSettings, updateSettings } from './utils';

const coefficient = 2.20462;
const fix = (value: number) => Number(value.toFixed(2));
const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

export function Home() {
  const settings = getSettings();
  const [values, setValues] = useState(() => {
    return {
      lbs: settings.lbs,
      kgs: settings.kgs,
    };
  });

  const [max, setMax] = useState(settings.max ?? 0);

  const maxInKg = () => max / coefficient;

  const kgPlus = () => {
    setValues(({ kgs }) => ({
      kgs: kgs + 1,
      lbs: fix((kgs + 1) * coefficient),
    }));
  };

  const kgMinus = () => {
    setValues(({ kgs }) => ({
      kgs: kgs - 1,
      lbs: fix((kgs - 1) * coefficient),
    }));
  };

  const handleKgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const kgs = Number(event.currentTarget.value);

    setValues({
      kgs: kgs,
      lbs: fix(kgs * coefficient),
    });
  };

  const lbsPlus = () => {
    setValues(({ lbs }) => ({
      lbs: lbs + 1,
      kgs: fix((lbs + 1) / coefficient),
    }));
  };

  const lbsMinus = () => {
    setValues(({ lbs }) => ({
      lbs: lbs - 1,
      kgs: fix((lbs - 1) / coefficient),
    }));
  };

  const handleLbsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lbs = Number(event.currentTarget.value);
    const kgs = lbs / coefficient;

    setValues({
      kgs: lbs,
      lbs: fix(kgs / coefficient),
    });
  };

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
      kgs: values.kgs,
      lbs: values.lbs,
      max: max,
    });
  }, [values, max]);

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max (lbs)</span>

          <input
            value={max}
            type="number"
            pattern="[0-9]*"
            onInput={(e) => setMax(Number(e.currentTarget.value))}
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
            const roundedAmountKg = () =>
              fix(Math.round((max * percentage) / coefficient / 2.5) * 2.5);

            const roundedAmountLbs = () => fix(roundedAmountKg() * coefficient);

            const actualPercent = () => fix(roundedAmountKg() / maxInKg());

            return (
              <tr key={percentage}>
                <td>{percentage * 100}%</td>
                <td>{roundedAmountKg()}</td>
                <td>{roundedAmountLbs()}</td>
                <td>{actualPercent()}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="space-y-4">
        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Kilograms</span>
            <input value={values.kgs} type="number" pattern="[0-9]*" onChange={handleKgsChange} />
          </label>

          <div className="flex gap-2">
            <button onClick={kgPlus}>+</button>
            <button onClick={kgMinus}>-</button>
          </div>
        </li>

        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Pounds</span>
            <input value={values.lbs} type="number" pattern="[0-9]*" onChange={handleLbsChange} />
          </label>
          <div className="flex gap-2">
            <button onClick={lbsPlus}>+</button>
            <button onClick={lbsMinus}>-</button>
          </div>
        </li>
      </ul>
    </main>
  );
}

export default Home;
