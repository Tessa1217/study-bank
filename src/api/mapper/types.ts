export type Credentials = {
  email: string;
  password: string;
};

export type Provider = "github" | "google";

export type Profile = {
  avatar_url: string;
  user_name: string;
  interests: string[];
  languages: string[];
};

export type UserProfile = {
  id: string;
  user_name: string;
  avatar_url?: string;
  interests?: string[] | undefined;
  languages?: string[] | undefined;
};

export type UploadOptions = {
  bucket?: string;
  folder?: string;
  upsert?: boolean;
  signedUrlExpiresIn?: number;
};

export type StudySetDraft = {
  id?: string;
  title: string;
  description?: string;
  isPublic: boolean;
};

export type StudyCardDraft = {
  id: string;
  set_id: string;
  word: string;
  word_lang?: string | null;
  definition: string;
  definition_lang?: string | null;
  sort_order: number;
};

export type StudySetSummary = {
  id: string;
  title: string;
  description?: string | null;
  isPublic: boolean;
};

export interface StudySetDetail extends StudySetSummary {
  cards: StudyCardDraft[];
}

export type StudySetItem = {
  id: string;
  title: string;
  userName: string;
  cardCnt: number;
  addedToFolder: boolean;
};

export type StudyFolderSummary = {
  id?: string;
  name: string;
  description?: string | null;
};

export type StudyMatchGameSessionSummary = {
  id?: string;
  userId: string;
  setId: string;
  startTime: Date | number;
  endTime: Date | number | null;
  totalTime: number;
  attempts: number;
  correctMatches: number;
  wrongMatches: number;
};
