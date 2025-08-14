import { z } from 'zod'

export const CredentialSchema = z.object({
  email: z.email().trim().min(1, "이메일은 필수입니다."),
  password: z.string().trim().min(6, "비밀번호는 최소 6자리 이상 입력해주세요.").max(20, "비밀번호는 최대 20자리까지 입력 가능합니다.")
})

export const FolderSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "폴더명은 필수입니다."),
  description: z.string().optional()
})

/** 카드 스키마 */
export const CardSchema = z.object({
  id : z.string(),
  set_id : z.string(),
  sort_order: z.number().int().min(1),
  word: z.string().trim().min(1, "단어는 필수입니다."),
  definition: z.string().trim().min(1, "뜻은 필수입니다."),
  word_lang: z.string(),
  definition_lang: z.string()  
})

/** 학습 세트 스키마 */
export const SetSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "세트명은 필수입니다."),
  description: z.string().max(2000).optional(),
  cards: z.array(CardSchema)
          .min(1, "카드를 1장 이상 등록해주세요.")          
})

export type SetInput = z.infer<typeof SetSchema>