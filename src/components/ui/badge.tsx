import {
  getBadgeClasses,
  type BaseBadgeProps,
} from "@/components/ui/badge.styles";
import clsx from "clsx";

interface BadgeProps extends BaseBadgeProps {
  title?: string;
  className?: string;
}
const Badge = ({
  title,
  color,
  size,
  shape,
  icon,
  iconOnly,
  className,
}: BadgeProps) => {
  const badgeClasses = getBadgeClasses({ color, size, shape, icon, iconOnly });
  return (
    <span className={clsx(badgeClasses, className)}>
      {iconOnly ? (
        icon
      ) : (
        <>
          {title && <span>{title}</span>}
          {icon && <span>{icon}</span>}
        </>
      )}
    </span>
  );
};

export default Badge;
