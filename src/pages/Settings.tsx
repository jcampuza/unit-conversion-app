import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Mode, useStore, useUpdateStore } from '../lib/store';
import { fix } from '../lib/utils';

export const Settings = () => {
  const values = useStore((s) => s);
  const updateStore = useUpdateStore();

  const [bench, setBench] = useState(values.bench ?? 0);
  const [squat, setSquat] = useState(values.squat ?? 0);
  const [deadlift, setDeadlift] = useState(values.deadlift ?? 0);
  const [mode, setMode] = useState(values.mode ?? Mode.lbs);
  const [lastUpdated, setLastUpdated] = useState(values.lastUpdatedTimestamp ?? null);
  const [saved, setSaved] = useState(false);

  const handleBenchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setBench(fix(value));
  };

  const handleSquatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setSquat(fix(value));
  };

  const handleDeadliftChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setDeadlift(fix(value));
  };

  const timeoutId = useRef<NodeJS.Timeout>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof bench !== 'number' || typeof squat !== 'number') {
      alert('there was an issue');
      return;
    }

    const updateTimeStamp = Date.now();

    updateStore((s) => ({
      ...s,
      bench,
      squat,
      deadlift,
      lastUpdatedTimestamp: updateTimeStamp,
      mode: mode,
    }));
    setLastUpdated(updateTimeStamp);
    setSaved(true);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const getLastUpdatedTime = () => {
    const curr = lastUpdated;
    if (curr) {
      return new Date(curr).toLocaleDateString();
    }
    return '';
  };

  const lastUpdatedTime = getLastUpdatedTime();

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-4 mb-4">
          <ul className="space-y-4">
            <li>
              <label className="flex flex-col">
                <span>Bench Training Max</span>
                <input value={bench} type="number" pattern="[0-9]*" onChange={handleBenchChange} />
              </label>
            </li>

            <li>
              <label className="flex flex-col">
                <span>Squat Training Max</span>
                <input value={squat} type="number" pattern="[0-9]*" onChange={handleSquatChange} />
              </label>
            </li>

            <li>
              <label className="flex flex-col">
                <span>Deadlift Training Max</span>
                <input
                  value={deadlift}
                  type="number"
                  pattern="[0-9]*"
                  onChange={handleDeadliftChange}
                />
              </label>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="mb-2">Mode</p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="lbs"
                checked={mode === 'lbs'}
                onChange={() => setMode(Mode.lbs)}
              />
              <span className="ml-2">Lbs</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="kg"
                checked={mode === 'kgs'}
                onChange={() => setMode(Mode.kgs)}
              />
              <span className="ml-2">Kgs</span>
            </label>
          </div>
        </div>

        <div>
          <button type="submit">Update</button>
          {saved ? <span style={{ marginLeft: '1rem' }}>Saved!</span> : null}
        </div>
      </form>

      {lastUpdatedTime ? <div className="mt-4">Last Updated: {lastUpdatedTime}</div> : null}
    </main>
  );
};
