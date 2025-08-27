import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudyFolderSet,
  deleteStudyFolderSet,
  getStudyFolderAvailableSets,
  getStudyFolderSets,
} from "@/api/folderSet.api";
import {
  toFolderSetCreateDTO,
  toFolderSetDeleteDTO,
  toSetItem,
} from "@/api/mapper/mapper";
import { folderSetsKeys } from "@/hooks/queries/keys";
import { useAuthStore } from "@/store/useAuthStore";
import type { StudySetItem } from "@/api/mapper/types";

export function useFolderSetsQuery(folderId: string | undefined) {
  return useQuery({
    queryKey: folderId
      ? folderSetsKeys.list(folderId)
      : folderSetsKeys.list(""),
    enabled: !!folderId,
    queryFn: async () => {
      if (!folderId) throw new Error("Missing folder id");
      const res = await getStudyFolderSets(folderId);
      if (res.error) throw res.error;
      return res.data!;
    },
    select: (rows) => rows?.map(toSetItem),
  });
}

export function useFolderAvailableSetsQuery(
  userId: string | undefined,
  folderId: string | undefined
) {
  return useQuery({
    queryKey: folderId
      ? folderSetsKeys.availableList(folderId)
      : folderSetsKeys.availableList(""),
    enabled: !!userId && !!folderId,
    queryFn: async () => {
      if (!userId) throw new Error("Missing user id");
      if (!folderId) throw new Error("Missing folder id");
      const res = await getStudyFolderAvailableSets(userId, folderId);
      if (res.error) throw res.error;
      return res.data!;
    },
    select: (rows) => rows?.map(toSetItem),
  });
}

export function useCreateFolderSetMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fs: { item: StudySetItem; folderId: string }) => {
      const { id: setId } = fs.item;
      const folderId = fs.folderId;
      const payload = toFolderSetCreateDTO({ setId, folderId });
      const res = await createStudyFolderSet(payload);
      if (res.error) throw res.error;
      return res.data!;
    },
    onMutate: async (fs) => {
      await qc.cancelQueries({ queryKey: folderSetsKeys.list(fs.folderId) });
      const previousList = qc.getQueryData(folderSetsKeys.list(fs.folderId));
      qc.setQueryData(
        folderSetsKeys.list(fs.folderId),
        (oldData?: StudySetItem[]) => {
          const newItem: StudySetItem = {
            ...fs.item,
            addedToFolder: true,
          };
          return [...(oldData || []), newItem];
        }
      );
      return { previousList };
    },
    onError: (_err, fs, context) => {
      if (context?.previousList) {
        qc.setQueryData(folderSetsKeys.list(fs.folderId), context.previousList);
      }
    },
    onSettled: (_data, _error, fs) => {
      qc.invalidateQueries({ queryKey: folderSetsKeys.list(fs.folderId) });
      qc.invalidateQueries({
        queryKey: folderSetsKeys.availableList(fs.folderId),
      });
    },
  });
}

export function useDeleteFolderSetMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fs: { item: StudySetItem; folderId: string }) => {
      const { id: setId } = fs.item;
      const folderId = fs.folderId;
      const payload = toFolderSetDeleteDTO({ setId, folderId });
      const res = await deleteStudyFolderSet(payload);
      console.log(res);
      if (res.error) throw res.error;
      return res.data!;
    },
    onMutate: async (fs) => {
      await qc.cancelQueries({ queryKey: folderSetsKeys.list(fs.folderId) });
      const previousList = qc.getQueryData(folderSetsKeys.list(fs.folderId));
      qc.setQueryData(
        folderSetsKeys.list(fs.folderId),
        (oldData?: StudySetItem[]) => {
          return [...(oldData || [])].filter(({ id }) => id !== fs.item.id);
        }
      );
      return { previousList };
    },
    onError: (_err, fs, context) => {
      if (context?.previousList) {
        qc.setQueryData(folderSetsKeys.list(fs.folderId), context.previousList);
      }
    },
    onSettled: (_data, _error, fs) => {
      qc.invalidateQueries({ queryKey: folderSetsKeys.list(fs.folderId) });
      qc.invalidateQueries({
        queryKey: folderSetsKeys.availableList(fs.folderId),
      });
    },
  });
}
