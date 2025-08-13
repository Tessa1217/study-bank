import { Paperclip, Image, Music } from "lucide-react";
import clsx from "clsx";
const CardListItem = ({
  cardNumber,
  selected,
}: {
  cardNumber: number;
  selected: boolean;
}) => {
  return (
    <>
      <div className="flex-1">
        <div
          className={clsx(
            `text-sm font-medium`,
            selected && "font-bold text-primary"
          )}
        >
          카드 {cardNumber}
        </div>
        <div className="text-xs text-slate-500 truncate">
          앞면 미리보기 텍스트…
        </div>
      </div>
      <div className="flex gap-2 text-slate-400">
        <Paperclip className="size-4" />
        <Image className="size-4" />
        <Music className="size-4" />
      </div>
    </>
  );
};

export default CardListItem;
