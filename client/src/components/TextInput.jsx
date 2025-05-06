import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getLabelClasses = () => {
    let classes = "text-xs px-1 ";
    if (error) classes += "text-red-600 ";
    else if (popup) classes += "text-gray-400 ";
    else classes += "text-red-600 ";
    if (small) classes += "text-[8px] ";
    return classes;
  };

  const getInputWrapperClasses = () => {
    let classes = "rounded-lg border-[0.5px] bg-transparent outline-none p-4 flex items-center gap-3 ";
    if (error) classes += "border-red-600 ";
    else if (popup) classes += "border-gray-400/60 text-gray-400 ";
    else classes += "border-gray-400 text-gray-800 focus-within:border-blue-600 ";
    if (small) classes += "rounded-md p-2 px-2.5 ";
    if (chipableInput) classes += "bg-white flex-col items-start gap-2 ";
    if (height) classes += `min-h-[${height}] `;
    return classes;
  };

  const getInputClasses = () => {
    let classes = "w-full text-sm outline-none border-none bg-transparent ";
    if (small) classes += "text-xs ";
    if (popup) classes += "text-gray-400 ";
    else classes += "text-red-600 ";
    return classes;
  };

  return (
    <div className={`flex-1 flex flex-col gap-1.5`}>
      {label && (
        <label className={getLabelClasses()}>
          {label}
        </label>
      )}
      <div className={getInputWrapperClasses()}>
        {chipableInput ? (
          <div className="flex flex-wrap gap-1.5">
            {chipableArray?.map((chip, index) => (
              <div 
                key={index}
                className="px-2.5 py-1.5 rounded-lg bg-red-600/10 text-red-600 text-xs flex items-center gap-1 cursor-pointer transition-all duration-300"
              >
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </div>
            ))}
            <input
              className={getInputClasses()}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
            />
          </div>
        ) : (
          <>
            <input
              className={getInputClasses()}
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handelChange(e)}
              type={password && !showPassword ? "password" : "text"}
            />
            {password && (
              <>
                {showPassword ? (
                  <Visibility 
                    className="cursor-pointer"
                    onClick={() => setShowPassword(false)} 
                  />
                ) : (
                  <VisibilityOff 
                    className="cursor-pointer"
                    onClick={() => setShowPassword(true)} 
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      {error && (
        <p className={`text-xs mx-1 text-red-600 ${small ? "text-[8px]" : ""}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
