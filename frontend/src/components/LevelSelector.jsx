import React, { useState } from 'react';

const LevelSelector = () => {
  const [level, setLevel] = useState('B1');

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">
        Selecciona tu nivel de inglés:
      </label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="A1">A1 - Principiante</option>
        <option value="A2">A2 - Básico</option>
        <option value="B1">B1 - Intermedio</option>
        <option value="B2">B2 - Intermedio alto</option>
        <option value="C1">C1 - Avanzado</option>
        <option value="C2">C2 - Profesional</option>
      </select>
      <p className="mt-2 text-sm text-gray-500">
        Nivel actual seleccionado: <strong>{level}</strong>
      </p>
    </div>
  );
};

export default LevelSelector;
