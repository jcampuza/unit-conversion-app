import React, { useState } from 'react';
import { fix } from './utils';

const value = new Map([
  [1, 1.0],
  [2, 0.97],
  [3, 0.94],
  [4, 0.92],
  [5, 0.89],
  [6, 0.86],
  [7, 0.83],
  [8, 0.81],
  [9, 0.78],
  [10, 0.75],
  [11, 0.73],
  [12, 0.71],
  [13, 0.7],
  [14, 0.68],
  [15, 0.67],
  [16, 0.65],
  [17, 0.64],
  [18, 0.63],
  [19, 0.61],
  [20, 0.6],
  [21, 0.59],
  [22, 0.58],
  [23, 0.57],
  [24, 0.56],
  [25, 0.55],
  [26, 0.54],
  [27, 0.53],
  [28, 0.52],
  [29, 0.51],
  [30, 0.5],
]);

export const OneRepMax = () => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const onWeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setWeight(Number(e.currentTarget.value));
  };

  const onRepsChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setReps(Number(e.currentTarget.value));
  };

  const getOneRepMax = () => {
    const percent = value.get(reps);
    if (!percent) {
      return null;
    }

    return fix(weight / percent);
  };

  return (
    <main className="p-4">
      <div className="space-y-2 mb-4">
        <label className="flex flex-col">
          <span>Weight (lbs)</span>
          <input value={weight} type="number" pattern="[0-9]*" onChange={onWeightChange} />
        </label>

        <label className="flex flex-col">
          <span>Reps</span>
          <input value={reps} type="number" pattern="[0-9]*" onChange={onRepsChange} />
        </label>
      </div>

      <div>Estimated One Rep Max: {getOneRepMax() ?? 'Please enter reps below 30'}</div>
    </main>
  );
};
