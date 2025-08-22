import { useQuery } from '@tanstack/react-query'
import { cardKeys } from '@/hooks/queries/keys'
import { getStudyCardsBySetId } from '@/api/cards.api'
import { toCard } from '@/api/mapper/mapper'

export function useCardListQuery(setId : string | undefined) {
  return useQuery({
    queryKey : setId ? cardKeys.list(setId) : cardKeys.list(''),
    enabled: !!setId,
    queryFn: async () => {
      if (!setId) throw new Error("Missing Set Id for card stacks")
      const { data } = await getStudyCardsBySetId(setId)
      return data
    },
    select: (rows) => rows?.map(toCard)
  })
}