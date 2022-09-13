import { useEffect, useState } from 'react';
import { useStore, useUpdateStore, Mode } from '../lib/store';
import { fix, KG_COEFFICIENT } from '../lib/utils';

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

export const Home = () => {
  const { squat, bench, deadlift, max: settingsMax, mode } = useStore((state) => state);
  const updateStore = useUpdateStore();
  const [max, setMax] = useState(settingsMax ?? 0);

  const useSquatMax = () => {
    setMax(squat);
  };

  const useBenchMax = () => {
    setMax(bench);
  };

  const useDeadliftMax = () => {
    setMax(deadlift);
  };

  useEffect(() => {
    updateStore((state) => ({ ...state, max }));
  }, [max, updateStore]);

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max ({mode})</span>

          <input
            value={max}
            type="number"
            pattern="[0-9]*"
            onChange={(e) => setMax(Number(e.currentTarget.value))}
          />
        </label>
        <div className="flex gap-2">
          <button onClick={useBenchMax}>Bench Max</button>
          <button onClick={useSquatMax}>Squat Max</button>
          <button onClick={useDeadliftMax}>Deadlift Max</button>
        </div>
      </div>

      <PercentageTable max={max} />
    </main>
  );
};

export default Home;

const PercentageTable = ({ max }: { max: number }) => {
  const mode = useStore((state) => state.mode);

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
};
