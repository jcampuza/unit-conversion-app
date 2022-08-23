import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { fix, getSettings, updateSettings } from './utils';

export const Settings = () => {
  const values = getSettings();
  const [bench, setBench] = useState(values.bench ?? 0);
  const [squat, setSquat] = useState(values.squat ?? 0);
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

  const timeoutId = useRef<NodeJS.Timeout>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof bench !== 'number' || typeof squat !== 'number') {
      alert('there was an issue');
      return;
    }

    const updateTimeStamp = Date.now();
    updateSettings({ bench: bench, squat: squat, lastUpdatedTimestamp: updateTimeStamp });
    setLastUpdated(updateTimeStamp);
    setSaved(true);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  useEffect(() => {
    clearTimeout(timeoutId.current);
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
          </ul>

          <div>
            <button type="submit">Update</button>
            {saved ? <span style={{ marginLeft: '1rem' }}>Saved!</span> : null}
          </div>

          {lastUpdatedTime ? <div className="mt-4">Last Updated: {lastUpdatedTime}</div> : null}
        </div>
      </form>
    </main>
  );
};
