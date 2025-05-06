import { CircularProgress } from "@mui/material";
import React from "react";

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  const getButtonClasses = () => {
    let classes = "rounded-xl text-white text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 ";
    
    // Base styles
    classes += small ? "py-2.5 px-7 " : "py-4 px-6.5 md:py-2 md:px-3 ";
    
    // Type styles
    if (type === "secondary") {
      classes += outlined 
        ? "bg-transparent text-blue-600 border border-blue-600 "
        : "bg-blue-600 border border-blue-600 ";
    } else {
      classes += outlined 
        ? "bg-transparent text-red-600 border border-red-600 "
        : "bg-red-600 border border-red-600 ";
    }
    
    // State styles
    if (isDisabled || isLoading) {
      classes += "opacity-80 cursor-not-allowed ";
    }
    
    // Layout styles
    if (flex) classes += "flex-1 ";
    if (full) classes += "w-full ";
    
    return classes.trim();
  };

  return (
    <div
      onClick={() => !isDisabled && !isLoading && onClick()}
      className={getButtonClasses()}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </div>
  );
};

export default Button;
