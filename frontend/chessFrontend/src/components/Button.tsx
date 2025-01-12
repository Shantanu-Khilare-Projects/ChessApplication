export const Button = ({
    onClick,
    children,
    className,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`px-8 w-[350px] h-[100px] rounded-3xl hover:bg-emerald-700 hover:text-white transition duration-300 py-4 text-2xl bg-slate-200 text-black font-bold  ${className}`}
      >
        {children}
      </button>
    );
  };