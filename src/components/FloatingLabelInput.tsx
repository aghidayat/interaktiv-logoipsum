import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FloatingLabelInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  register,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={`relative h-[52px]`}>
      <input
        {...register}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-5 pb-2 border rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
