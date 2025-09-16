import clsx from "clsx";

type MatchGameCardProps = {
  text: string;
  isSelected: boolean;
  isMatched: boolean;
  isErrored: boolean;
  onClick: () => void;
};

const MatchGameCard = ({
  text,
  isSelected,
  isMatched,
  isErrored,
  onClick,
}: MatchGameCardProps) => {
  const cardClasses = clsx("match-card", {
    "bg-white hover:bg-slate-50 border-slate-200 hover:-translate-y-1":
      !isSelected && !isMatched,
    "error-card": isErrored,
    "bg-yellow-200 border-yellow-400 scale-105 shadow-xl": isSelected,
    "opacity-0 scale-75 pointer-events-none": isMatched,
  });

  return (
    <div className="h-28 sm:h-32">
      {" "}
      {/* Container with fixed height */}
      <div className={cardClasses} onClick={onClick}>
        <span className="text-sm sm:text-base font-medium text-slate-800">
          {text}
        </span>
      </div>
    </div>
  );
};

export default MatchGameCard;
