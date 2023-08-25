import React from "react";
import { Typography } from ".";
import IcChecked from "@/assets/checklist.svg";

type CheckboxProps = {
  label: string;
  subLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  card?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  subLabel,
  checked,
  onChange,
  card,
}) => {
  return (
    <div
      className={
        card
          ? `border ${
              checked ? "border-secondary-500" : "border-neutral-300"
            } p-6 rounded-2xl bg-white`
          : ""
      }>
      <label className="flex">
        <input
          type="checkbox"
          className="relative peer appearance-none w-5 h-5 border border-neutral-300 rounded-[4px] bg-neutral-50 mt-1 checked:bg-neutral-50 checked:border checked:border-secondary-500"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <img
          className="absolute w-5 h-5 mt-1 hidden peer-checked:block pointer-events-none p-[2px]"
          src={IcChecked}
          alt="checklist"
        />
        <div className="ml-2">
          <Typography
            variant="body-1"
            size="medium"
            className="text-neutral-700">
            {label}
          </Typography>
          <Typography
            variant="body-1"
            size="regular"
            className="text-neutral-500 mt-1">
            {subLabel}
          </Typography>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
