export const setsKeys = {
  all: ["sets"] as const,
  list: () => [...setsKeys.all, "list"] as const,
  detail: (id: string) => [...setsKeys.all, "detail", id] as const,
};

export const foldersKeys = {
  all: ["folders"] as const,
  list: () => [...foldersKeys.all, "list"] as const,
  detail: (id: string) => [...foldersKeys.all, "detail", id] as const,
};

export const folderSetsKeys = {
  all: ["folderSets"] as const,
  list: (folderId: string) =>
    [...folderSetsKeys.all, "list", folderId] as const,
  availableList: (folderId: string) =>
    [...folderSetsKeys.all, "availableList", folderId] as const,
};

export const setWithCardsKeys = {
  all: ["setWithCards"] as const,
  detail: (id: string) => [...setWithCardsKeys.all, "detail", id] as const,
};

export const cardKeys = {
  all: ["cards"] as const,
  list: (setId: string) => [...cardKeys.all, "list", setId] as const,
};

export const profileKeys = {
  all: ["user"] as const,
  detail: (userId: string) => [...profileKeys.all, "detail", userId] as const,
};

export const matchCardSessionKeys = {
  all: ["matchCardSession"] as const,
  stats: (userId: string, setId: string) =>
    [...matchCardSessionKeys.all, "stats", userId, setId] as const,
};
