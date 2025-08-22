import type { SbResult } from "@/api/shared/sb-api";
import type { StudyCardRow, StudyCardUpsert } from '@/api/repository/studyCard.repository'
import { studyCardRepository } from "@/api/repository/studyCard.repository";

export async function getStudyCardsBySetId(setId:string):SbResult<StudyCardRow[]> {
  return studyCardRepository.fetchAllBySetId(setId)
}

export async function saveStudyCards(payloads:StudyCardUpsert[]):SbResult<StudyCardRow[]> {
  return studyCardRepository.upsertAll(payloads)
}
