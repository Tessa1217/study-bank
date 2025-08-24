import { useState, useEffect } from "react";
import type { StudyFolderSummary } from "@/api/mapper/types";
import { FolderSchema } from "@/validation/schema";
import { useFolderMutation } from "@/hooks/queries/useFolderQuery";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/hooks/useAlert";

export function useFolderEditor(initialState?: StudyFolderSummary) {
  const navigate = useNavigate();
  const [folder, setFolder] = useState<StudyFolderSummary>(
    initialState || {
      name: "",
      description: "",
    }
  );

  useEffect(() => {
    if (initialState) {
      setFolder({ ...initialState });
    }
  }, [initialState]);

  const { mutateAsync: createFolder } = useFolderMutation();
  const { showConfirm, showSuccessAlert } = useAlert();

  const validateFolder = async () => {
    return FolderSchema.safeParseAsync(folder);
  };

  const handleSave = async () => {
    return new Promise(async (resolve, reject) => {
      const { success, error } = await validateFolder();
      if (!success) {
        return reject(error);
      }
      createFolder(folder, {
        onSuccess: (result) => resolve(result as StudyFolderSummary),
        onError: (error) => reject(error),
      });
    });
  };

  const onSave = () => {
    showConfirm({
      messageCode: "COMMON.INFO.CREATE",
      onAction: async () => {
        try {
          const result = await handleSave();
          const data = result as StudyFolderSummary;
          showSuccessAlert({
            messageCode: "COMMON.SUCCESS.CREATE",
            onAction: () => {
              navigate(`/folders/${data.id}`);
            },
          });
        } catch {
          console.error("error");
        }
      },
    });
  };

  const onCancel = () => {
    showConfirm({
      messageCode: "COMMON.INFO.CANCEL",
      onAction: () => navigate(`/library`),
    });
  };

  return {
    folder,
    setFolder,
    onSave,
    onCancel,
  };
}
