import { z } from 'zod'

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