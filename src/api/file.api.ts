import { supabase } from "@/lib/supabase";
import { type UploadOptions } from "@/api/mapper/types";

export async function uploadFile(file:File, opts : UploadOptions = {}) {

  const bucket = opts.bucket ?? "question-bank"
  // 파일 처리
  const ext = file.name.split(".").pop()?.toLowerCase()
  const base = file.name.replace(/\.[^/.]+$/, "");
  const safeBase = base.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 40);
  const uid = crypto.randomUUID().split("-")[0]

  const folder = opts.folder?.replace("/\/+$/", '') || "uploads"
  const fileName = `${safeBase || "file"}-${Date.now()}-${uid}.${ext}`

  // 최종 업로드 path 생성
  const path = `${folder}/${fileName}`

  const options = {upsert : !!opts.upsert, cacheControl: "3600", contentType : file.type || undefined}
  const { error } = await supabase.storage.from(bucket).upload(path, file, options)

  if (error) {
    throw new Error("failed to upload file")
  }

  const storage = supabase.storage.from(bucket);
  if (opts.signedUrlExpiresIn && opts.signedUrlExpiresIn > 0) {
    const { data : signed, error : signedErr } = await storage.createSignedUrl(path, opts.signedUrlExpiresIn)
    if (signedErr || !signed.signedUrl) throw signedErr ?? new Error("failed to create signed url for uploaded file")
    return { data : { path, url : signed.signedUrl }, error : null }
  } else {
    const publicUrl = getPublicUrl(path, bucket)
    return { data : { path, url : publicUrl }, error : null }
  }
                                
}

export function getPublicUrl(path:string, bucket:string = 'question-bank') {
  const { data } =  supabase.storage.from(bucket).getPublicUrl(path)  
  return data.publicUrl || undefined
}