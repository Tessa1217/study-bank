import type { StudySetItem } from "@/api/mapper/types";
import SetItem from "@/components/set/set-item";

export default function SetList({
  folderId,
  setList,
}: {
  folderId: string;
  setList?: StudySetItem[];
}) {
  if (!setList || setList.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        추가할 수 있는 학습 자료를 만들어보세요.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {setList.map((set) => (
        <SetItem key={set.id} item={set} folderId={folderId} />
      ))}
    </div>
  );
}
