import { useServiceHandler } from "@/hooks/services/useServiceHandler";
import { getStudyFolder as rawGetStudyFolder, insertStudyFolder as rawInsertStudyFolder } from "@/api/folder.api";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export function useFolderService() {
  const { bind, notify } = useServiceHandler();
  const uid = useAuthStore((state) => state.user?.id)
  const navigate = useNavigate()
  const insertStudyFolder = bind((payload) => rawInsertStudyFolder({...payload, user_id : uid}), {
    onSuccess: ({id}) => navigate(`/folder/${id}`),
    successMessage: '정상적으로 등록이 완료되었습니다.'
  })

  const getStudyFolder = bind((folderId: string) =>
    rawGetStudyFolder(folderId)
  );

  return { getStudyFolder, insertStudyFolder };
}
