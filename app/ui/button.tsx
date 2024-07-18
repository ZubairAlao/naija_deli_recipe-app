interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function OrangeButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-10 items-center rounded-lg bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 px-4 text-sm font-medium text-white transition-colors hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-300 hover:to-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:bg-gradient-to-r active:from-orange-600 active:via-orange-500 active:to-orange-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function GreenButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-8 items-center rounded-lg bg-gradient-to-r from-green-500 via-green-400 to-green-300 px-2 text-sm font-medium text-white transition-colors hover:bg-gradient-to-r hover:from-green-400 hover:via-green-300 hover:to-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-gradient-to-r active:from-green-600 active:via-green-500 active:to-green-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

