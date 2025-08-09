import clsx from "clsx";

interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  hidden?: boolean;
  children: React.ReactNode;
}
const Label = ({ htmlFor, hidden = false, children, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "block mb-1 font-medium text-gray-700",
        hidden && "hidden"
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
