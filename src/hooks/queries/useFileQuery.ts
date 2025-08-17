import { useMutation } from "@tanstack/react-query"
import { type UploadOptions } from "@/api/mapper/types"
import { uploadFile } from "@/api/file.api"

export const useFileMutation = (opts:UploadOptions) => {
  return useMutation({
    mutationFn: async (file:File) => {
      const { data } = await uploadFile(file, opts)
      return data
    },
  })
}