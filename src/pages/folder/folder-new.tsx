import { useState } from "react";
import { FolderSchema } from "@/validation/schema";
import { useFolderMutation } from "@/hooks/queries/useFolderQuery";
import Button from "@/components/button/button";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";

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
    <PageWrapper>
      <PageHeader
        title="폴더 생성"
        subTitle="나만의 학습 자료를 모을 수 있는 폴더를 생성해보세요."
      />
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
            value={folder.description}
            onChange={(e) =>
              setFolder({ ...folder, description: e.target.value })
            }
          />
        </div>
      </div>
      <PageButtonContainer>
        <Button type="button" variant="outline" color="secondary">
          취소
        </Button>
        <Button type="button" color="primary" onClick={onSave}>
          생성
        </Button>
      </PageButtonContainer>
    </PageWrapper>
  );
}
