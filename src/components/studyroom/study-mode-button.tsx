import { Link } from "react-router-dom";

type StudyModeButtonProps = {
  icon?: React.ReactNode;
  to: string;
  title: string;
};

export default function StudyModeButton({
  icon,
  to,
  title,
}: StudyModeButtonProps) {
  return (
    <Link to={to}>
      <div className="flex p-[1rem] align-middle justify-center gap-[1rem] bg-primary rounded-md">
        {icon && <div>{icon}</div>}
        <div>
          <h3 className="font-bold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
