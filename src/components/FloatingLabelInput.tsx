import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FloatingLabelInputProps = {
  label: string;
  register: UseFormRegisterReturn;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  register,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={`relative`}>
      <input
        {...register}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-4 border rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <label
        className={`absolute left-4 top-3 text-sm text-gray-500 ${
          isFocused || register
            ? "transform -translate-y-2 text-xs text-primary-500"
            : ""
        } transition-all duration-300`}>
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
