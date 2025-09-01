import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { foldersKeys } from "@/hooks/queries/keys";
import { useAuthStore } from "@/store/useAuthStore";
import {
  getStudyFolder,
  getStudyFolders,
  createStudyFolder,
  updateStudyFolder,
} from "@/api/folder.api";
import { toFolderSummary } from "@/api/mapper/mapper";
/** 폴더 목록 조회 */
export function useFolderListQuery() {
  return useQuery({
    queryKey: foldersKeys.list(),
    queryFn: async () => {
      const { data } = await getStudyFolders();
      return data;
    },
    select: (rows) => rows?.map(toFolderSummary),
  });
}

export function useFolderQuery(folderId: string | undefined) {
  return useQuery({
    queryKey: folderId ? foldersKeys.detail(folderId) : foldersKeys.detail(""),
    enabled: !!folderId,
    queryFn: async () => {
      if (!folderId) throw new Error("Missing Folder Id");
      const { data } = await getStudyFolder(folderId);
      return data;
    },
    select: (row) => (row ? toFolderSummary(row) : undefined),
  });
}

/** 폴더 생성 */
export function useFolderMutation() {
  const qc = useQueryClient();
  const uid = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async (payload: any) => {
      const mutationFunction = payload.id ? updateStudyFolder: createStudyFolder       
      const res = await mutationFunction({ ...payload, user_id: uid });
      if (res.error) throw res.error;
      return res.data!;
    },
    onSuccess: (data) => {
      // 목록 재검증
      qc.invalidateQueries({ queryKey: foldersKeys.list() });
      // 상세 프리캐시(선택)
      if (data?.id)
        qc.setQueryData(
          foldersKeys.detail(data.id),
          toFolderSummary(data as any)
        );
    },
  });
}
