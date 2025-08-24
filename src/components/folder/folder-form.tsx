import type { StudyFolderSummary } from "@/api/mapper/types";

const FolderForm = ({
  folder,
  setFolder,
}: {
  folder: StudyFolderSummary;
  setFolder: (folder: StudyFolderSummary) => void;
}) => {
  if (!folder) {
    return null;
  }
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="label">폴더명 *</label>
        <input
          className="input"
          placeholder="예: TOEIC 단어장"
          value={folder.name}
          onChange={(e) => setFolder({ ...folder, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="label">설명</label>
        <textarea
          className="input min-h-24"
          placeholder="폴더에 대한 설명"
          value={folder.description ?? ""}
          onChange={(e) =>
            setFolder({ ...folder, description: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default FolderForm;
