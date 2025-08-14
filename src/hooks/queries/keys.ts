export const setsKeys = {
  all: ['sets'] as const,
  list: () => [...setsKeys.all, 'list'] as const,
  detail: (id: string) => [...setsKeys.all, 'detail', id] as const,
};

export const foldersKeys = {
  all: ['folders'] as const,
  list: () => [...foldersKeys.all, 'list'] as const,
  detail: (id: string) => [...foldersKeys.all, 'detail', id] as const,
};

export const setWithCardsKeys = {
  all: ['setWithCards'] as const,
  detail: (id: string) => [...setWithCardsKeys.all, 'detail', id] as const,
};

export const cardKeys = {
  all: ['cards'] as const,
  list: (setId:string) => [...cardKeys.all, 'list', setId] as const,  
}