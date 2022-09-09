import { useEffect, useState } from 'react';
import { fix, getSettings, KG_COEFFICIENT, Mode, updateSettings } from '../lib/utils';

const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

function getPercentage(primaryRoundedAmount: number, maxInLbs: number, mode: Mode) {
  const maxInKg = maxInLbs / KG_COEFFICIENT;
  const maxToUse = mode === Mode.kgs ? maxInKg : maxInLbs;

  return fix((primaryRoundedAmount / maxToUse) * 100);
}

function getPrimaryRoundedAmount(max: number, percentage: number, mode: Mode) {
  return mode === Mode.kgs
    ? getRoundedAmountKg(max, percentage)
    : getRoundedAmountLbs(max, percentage);
}

function getRoundedAmountLbs(max: number, percentage: number) {
  return fix(Math.round((max * percentage) / 5) * 5);
}

function getRoundedAmountKg(max: number, percentage: number) {
  return fix(Math.round((max * percentage) / KG_COEFFICIENT / 2.5) * 2.5);
}

function getSecondaryRoundedAmount(primaryRoundedAmount: number, mode: Mode) {
  return mode === Mode.kgs
    ? getLbsFromKgs(primaryRoundedAmount)
    : getKgsFromLbs(primaryRoundedAmount);
}

function getLbsFromKgs(primaryRoundedAmount: number) {
  return fix(primaryRoundedAmount * KG_COEFFICIENT);
}

function getKgsFromLbs(primaryRoundedAmount: number) {
  return fix(primaryRoundedAmount / KG_COEFFICIENT);
}

export function Home() {
  const settings = getSettings();
  const [max, setMax] = useState(settings.max ?? 0);

  const useSquatMax = () => {
    const { squat } = getSettings();
    setMax(squat);
  };

  const useBenchMax = () => {
    const { bench } = getSettings();
    setMax(bench);
  };

  useEffect(() => {
    updateSettings({ max: max });
  }, [max]);

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max ({settings.mode})</span>

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

      <PercentageTable max={max} />
    </main>
  );
}

export default Home;

function PercentageTable({ max }: { max: number }) {
  const { mode } = getSettings();
  return (
    <table>
      <thead>
        <tr>
          <th>%</th>
          <th>{mode}</th>
          <th>
            {mode} -&gt; {mode === Mode.kgs ? Mode.lbs : Mode.kgs}
          </th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {PERCENTAGES.map((percentage) => {
          const primaryRoundedAmount = getPrimaryRoundedAmount(max, percentage, mode);
          const secondaryRoundedAmount = getSecondaryRoundedAmount(primaryRoundedAmount, mode);
          const actualPercent = getPercentage(primaryRoundedAmount, max, mode);

          return (
            <tr key={percentage}>
              <td>{percentage * 100}%</td>
              <td>{primaryRoundedAmount}</td>
              <td>{secondaryRoundedAmount}</td>
              <td>{actualPercent}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
