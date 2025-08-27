import Button from "@/components/button/button";
import { BookAIcon, CheckCheck, Plus } from "lucide-react";
import type { StudySetItem } from "@/api/mapper/types";
import {
  useCreateFolderSetMutation,
  useDeleteFolderSetMutation,
} from "@/hooks/queries/useFolderSetQuery";
import { useCallback } from "react";

export default function SetItem({
  folderId,
  item,
}: {
  folderId: string;
  item: StudySetItem;
}) {
  const { id, title, cardCnt, userName, addedToFolder } = item;
  const createMutation = useCreateFolderSetMutation();
  const deleteMutation = useDeleteFolderSetMutation();
  const onClick = useCallback(() => {
    if (addedToFolder) {
      deleteMutation.mutate({ item, folderId });
    } else {
      createMutation.mutate({
        item,
        folderId,
      });
    }
  }, [addedToFolder]);

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
        variant={addedToFolder ? "solid" : "outline"}
        size="sm"
        className="flex-shrink-0 rounded-full"
        onClick={onClick}
      >
        {addedToFolder ? <CheckCheck /> : <Plus />}
      </Button>
    </div>
  );
}
