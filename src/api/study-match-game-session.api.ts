import type { StudyMatchGameSessionInsert } from "@/api/repository/studyMatchGameSession.repository";
import { studyMatchGameSessionRepository } from "@/api/repository/studyMatchGameSession.repository";

export async function insertStudyMatchGameSession(
  payload: StudyMatchGameSessionInsert
) {
  const { data } = await studyMatchGameSessionRepository.create(payload);
  return data?.id!;
}

export async function getStudyMatchGameSession(setId: string, userId: string) {
  return studyMatchGameSessionRepository.findStatsBySetIdAndUserId(
    setId,
    userId
  );
}
