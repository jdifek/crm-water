import { useState } from "react";

const ConcentrationInput = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= 0 && newValue <= 100) {
      setValue(newValue);
    }
  };

  const increase = () => {
    setValue((prev) => Math.min(100, prev + 1));
  };

  const decrease = () => {
    setValue((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="concentration" className="text-gray-700">
        Концентрація продукту
      </label>
      <div className="flex items-center bg-white border rounded-lg shadow-sm px-2 py-1">
        <button
          onClick={decrease}
          className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md text-lg font-bold hover:bg-blue-600 transition"
        >
          −
        </button>
        <input
          id="concentration"
          type="number"
          value={value}
          onChange={handleChange}
          min="0"
          max="100"
          className="w-14 text-center text-lg font-semibold border-none outline-none bg-transparent"
        />
        <span className="text-gray-700 mr-2">%</span>
        <button
          onClick={increase}
          className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-md text-lg font-bold hover:bg-blue-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ConcentrationInput;
