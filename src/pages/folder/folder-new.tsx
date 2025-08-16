import { useState } from "react";
import { FolderSchema } from "@/validation/schema";
import { useFolderMutation } from "@/hooks/queries/useFolderQuery";

type Folder = {
  name: string;
  description?: string;
};

export default function FolderNew() {
  const [folder, setFolder] = useState<Folder>({
    name: "",
    description: "",
  });

  const { mutateAsync: createFolder } = useFolderMutation();

  const onSave = async () => {
    const res = await FolderSchema.safeParseAsync(folder);
    if (res.success) {
      await createFolder(folder);
    }
  };

  return (
    <div className="page">
      <h1 className="page-header">폴더 생성</h1>
      <div className="card grid gap-4 max-w-2xl">
        <div className="grid gap-1">
          <label className="text-sm font-medium">폴더명 *</label>
          <input
            className="input"
            placeholder="예: TOEIC 단어장"
            value={folder.name}
            onChange={(e) => setFolder({ ...folder, name: e.target.value })}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">설명</label>
          <textarea
            className="input min-h-24"
            placeholder="폴더에 대한 설명"
            value={folder.description}
            onChange={(e) =>
              setFolder({ ...folder, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="btn-container">
        <button type="button" className="btn-outline">
          취소
        </button>
        <button className="btn-primary" onClick={onSave}>
          생성
        </button>
      </div>
    </div>
  );
}
