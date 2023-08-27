import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Typography } from ".";

type FloatingLabelInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  register,
  disabled,
  error,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <div className={`relative h-[52px]`}>
        <input
          {...register}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 pt-5 pb-2 border rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
            error
              ? "border-danger-600 focus:ring-danger-300"
              : "focus:border-primary-500 focus:ring-primary-300"
          }`}
        />
        <label
          className={`absolute left-4 top-3 text-sm text-gray-500 ${
            isFocused || register
              ? "transform -translate-y-2 text-xs text-neutral-600"
              : ""
          } transition-all duration-300`}>
          {label}
        </label>
      </div>
      {error && (
        <Typography
          className="text-danger-600 mt-2"
          variant="body-2"
          size="regular">
          {error}
        </Typography>
      )}
    </>
  );
};

export default FloatingLabelInput;
