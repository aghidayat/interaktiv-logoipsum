import React from "react";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle-1"
    | "subtitle-2"
    | "body-1"
    | "body-2"
    | "caption"
    | "overline";
  size?: "regular" | "medium" | "semibold" | "bold";
  className?: string;
  children: React.ReactNode; // Use the class-variance-authority style
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  size,
  children,
  className,
}) => {
  let textClass = "";
  let sizeClass = "";

  switch (variant) {
    case "h1":
      textClass = "text-7xl line-90";
      break;
    case "h2":
      textClass = "text-6xl line-72";
      break;
    case "h3":
      textClass = "text-5xl line-60";
      break;
    case "h4":
      textClass = "text-4xl line-44";
      break;
    case "h5":
      textClass = "text-3xl line-38";
      break;
    case "h6":
      textClass = "text-2xl line-32";
      break;
    case "subtitle-1":
      textClass = "text-xl line-30";
      break;
    case "subtitle-2":
      textClass = "text-lg line-28";
      break;
    case "body-1":
      textClass = "text-base line-24";
      break;
    case "body-2":
      textClass = "text-sm line-20";
      break;
    case "caption":
      textClass = "text-xs line-18";
      break;
    case "overline":
      textClass = "text-[10px] line-16";
      break;
    default:
      textClass = "text-base line-24";
  }

  switch (size) {
    case "regular":
      sizeClass = "font-normal";
      break;
    case "medium":
      sizeClass = "font-medium";
      break;
    case "semibold":
      sizeClass = "font-semibold";
      break;
    case "bold":
      sizeClass = "font-bold";
      break;
    default:
      sizeClass = "font-medium";
  }

  const combinedClasses = `${textClass} ${sizeClass} ${className ?? ""}`;

  return <div className={combinedClasses}>{children}</div>;
};

export default Typography;
