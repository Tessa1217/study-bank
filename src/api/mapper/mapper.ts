import type {
  StudySetRow,
  StudySetWithCard,
} from "@/api/repository/studySet.repository";
import type {
  StudyFolderSetDelete,
  StudyFolderSetInsert,
  StudyFolderSetRelations,
} from "@/api/repository/studyFolderSet.repository";
import type {
  StudyMatchGameSessionInsert,
  StudyMatchGameSessionRow,
} from "@/api/repository/studyMatchGameSession.repository";
import type {
  StudyCardDraft,
  StudyFolderSummary,
  StudySetDetail,
  StudySetItem,
  StudySetSummary,
  UserProfile,
  StudyMatchGameSessionSummary,
} from "@/api/mapper/types";
import type { StudyCardRow } from "@/api/repository/studyCard.repository";
import type { StudyFolderRow } from "@/api/repository/studyFolder.repository";
import type {
  ProfilesRow,
  ProfilesUpdate,
} from "@/api/repository/profiles.repository";

export function toUserProfileDTO(
  userProfile: UserProfile
): Partial<ProfilesUpdate> {
  return {
    id: userProfile.id!,
    user_name: userProfile.user_name!,
    avatar_url: userProfile.avatar_url ?? "",
    interests: userProfile.interests ?? undefined,
    languages: userProfile.languages ?? undefined,
  };
}

export function toUserProfile(row: Partial<ProfilesRow>): UserProfile {
  return {
    id: row.id!,
    user_name: row.user_name!,
    avatar_url: row.avatar_url ?? "",
    interests: row.interests ?? undefined,
    languages: row.languages ?? undefined,
  };
}

export function toFolderSetCreateDTO(fs: {
  folderId: string;
  setId: string;
}): StudyFolderSetInsert {
  return {
    folder_id: fs.folderId,
    set_id: fs.setId,
  };
}

export function toFolderSetDeleteDTO(fs: {
  folderId: string;
  setId: string;
}): StudyFolderSetDelete {
  return {
    folder_id: fs.folderId,
    set_id: fs.setId,
  };
}

export function toSetDTO(d: {
  id?: string;
  title: string;
  description?: string;
  isPublic: boolean;
}) {
  return {
    id: d.id ?? null,
    title: d.title,
    description: d.description ?? null,
    is_public: d.isPublic,
  };
}

export function toCardsDTO(cards: StudyCardDraft[]) {
  cards
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((c, i) => (c.sort_order = i + 1));
  return cards.map((c) => ({
    id: c.id ?? null,
    sort_order: c.sort_order,
    word: c.word,
    definition: c.definition,
    word_lang: c.word_lang,
    definition_lang: c.definition_lang,
  }));
}

export function toStudyMatchCardSessionDTO(
  d: StudyMatchGameSessionSummary
): StudyMatchGameSessionInsert {
  return {
    id: d.id,
    set_id: d.setId,
    user_id: d.userId,
    start_time: new Date(d.startTime).toISOString(),
    end_time: d.endTime ? new Date(d.endTime).toISOString() : null,
    total_time: d.totalTime,
    attempts: d.attempts,
    correct_matches: d.correctMatches,
    wrong_matches: d.wrongMatches,
  };
}

export function toFolderSummary(
  row: Partial<StudyFolderRow>
): StudyFolderSummary {
  return {
    id: row.id!,
    name: row.name!,
    description: row.description ?? null,
  };
}

export function toSetSummary(row: Partial<StudySetRow>): StudySetSummary {
  return {
    id: row.id!,
    title: row.title!,
    description: row.description ?? null,
    isPublic: row.is_public!,
  };
}

export function toSetItem(row: StudyFolderSetRelations): StudySetItem {
  return {
    id: row.id!,
    title: row.title!,
    userName: row.user_name,
    cardCnt: row.card_count,
    addedToFolder: row.added_to_folder,
  };
}

export function toCard(row: Partial<StudyCardRow>): StudyCardDraft {
  return {
    id: row.id!,
    sort_order: row.sort_order!,
    set_id: row.set_id!,
    word: row.word!,
    definition: row.definition!,
    word_lang: row.word_lang ?? "",
    definition_lang: row.definition_lang ?? "",
  };
}

export function toSetDetail(row: StudySetWithCard): StudySetDetail {
  const cards = (row.study_card ?? []).map(toCard);
  return {
    id: row.id!,
    title: row.title!,
    description: row.description ?? null,
    isPublic: row.is_public!,
    cards,
  };
}
