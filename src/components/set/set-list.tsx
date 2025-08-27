import type { StudySetItem } from "@/api/mapper/types";
import Button from "@/components/button/button";
import { BookAIcon, Plus } from "lucide-react";

export function SetList({ setList }: { setList?: StudySetItem[] }) {
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
        <Set key={set.id} {...set} />
      ))}
    </div>
  );
}

function Set({ id, title, cardCnt, userName }: StudySetItem) {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      {/* 왼쪽 아이콘 및 텍스트 섹션 */}
      <div className="flex items-start gap-4">
        {/* 아이콘: 예시로 간단한 svg 또는 div로 대체 */}
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-md">
          <BookAIcon />
        </div>

        {/* 텍스트 컨텐츠 */}
        <div className="flex-1 min-w-0">
          <div className="truncate font-semibold text-gray-800">{title}</div>
          <div className="inline-flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span>{cardCnt} terms</span>
            <span>Creator: {userName}</span>
          </div>
        </div>
      </div>
      {/* 오른쪽 "+" 버튼 섹션 */}
      <Button
        color="primary"
        variant="outline"
        size="sm"
        className="flex-shrink-0 rounded-full"
      >
        <Plus />
      </Button>
    </div>
  );
}
