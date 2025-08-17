import { useEffect, useState, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from '@/api/file.api'
import type { UploadOptions } from '@/api/mapper/types'

type FileItem = { file : File; preview : string }

type Options = {
  defaultUpload?: UploadOptions;
  validate?: (file:File) => string | null;
}

export function useFileUploder(opts: Options = {}) {
  const { defaultUpload, validate } = opts
  const [item, setItem] = useState<FileItem | null>(null);
  const [initialUrl, setInitialUrl] = useState<string | null>(null);

  const select = useCallback((input:File | FileList | null | undefined) => {
    let f : File | null = null
    if (input instanceof File) f = input
    else if (input && "length" in input && input.length) f = input[0]
    if (!f) return

    // 파일에 대한 유효성 검사
    if (validate) {
      const msg = validate(f)
      if (msg) throw new Error(msg)
    }

    if (item?.preview) URL.revokeObjectURL(item.preview)
    setItem({file : f, preview: URL.createObjectURL(f) })
    
  }, [item?.preview, validate])

  const remove = useCallback(() => {
    if (item?.preview) URL.revokeObjectURL(item.preview)
    setItem(null)
  }, [item?.preview])

  useEffect(() => {
    return () => {
      if (item?.preview) URL.revokeObjectURL(item.preview)
    }
  }, [item?.preview])

  const mutation = useMutation({
    mutationKey: ["upload", defaultUpload],
    mutationFn: async () => {
      if (!item?.file) throw new Error("there is no file selected")
      const { data } = await uploadFile(item.file, defaultUpload)
      return data
    }
  })

  const clear = () => {
    remove();
    mutation.reset();
  }

  return {
    file: item?.file ?? null,
    preview: item?.preview ?? initialUrl ?? null,
    hasLocalFile: Boolean(item),
    select, remove, clear, setInitialUrl, upload: mutation.mutateAsync, mutation
  }
}