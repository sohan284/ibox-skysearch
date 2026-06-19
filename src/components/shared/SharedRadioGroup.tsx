"use client";

import React from "react";

interface SharedRadioGroupProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
}

const SharedRadioGroup: React.FC<SharedRadioGroupProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-4 h-4 accent-primary"
            />
            <span
              className={`text-sm font-medium ${
                value === option.value ? "text-primary" : "text-gray-500"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SharedRadioGroup;
