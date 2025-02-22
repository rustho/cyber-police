interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = ({
  children,
  variant = "default",
  ...props
}: ButtonProps) => {
  const variantClasses = {
    default: "bg-blue-500 text-white px-4 py-2 rounded mr-2",
    outline:
      "  border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
  };

  const className = variantClasses[variant] || variantClasses.default;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
