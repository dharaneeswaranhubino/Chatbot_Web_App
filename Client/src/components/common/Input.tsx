import React, { useState } from "react";

type InputProp = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onchange,
}: InputProp) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400 tracking-wide uppercase">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onchange}
          className={`
            w-full bg-slate-800/50 text-slate-100
            placeholder-slate-600 rounded-xl px-4 py-3 text-sm
            focus:outline-none transition-all duration-200
            pr-10
            ${
              error
                ? "border border-red-500 focus:border-red-500"
                : "border border-slate-700 focus:border-violet-500 focus:bg-slate-800"
            }
          `}
        />

        {/* Font Awesome Eye Icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            />
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
