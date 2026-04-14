import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

const Button = ({
  children,
  isLoading = false,
  loadingText,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`
        w-full relative flex items-center justify-center gap-2
        bg-violet-600 hover:bg-violet-500
        text-white font-medium text-sm
        px-4 py-3 rounded-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading && (
        <i className="fa-solid fa-spinner fa-spin"></i>
      )}
      {isLoading ? (loadingText ?? "Loading...") : children}
    </button>
  );
};

export default Button;