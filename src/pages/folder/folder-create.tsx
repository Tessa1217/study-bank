import Button from "@/components/button/button";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";
import { useFolderEditor } from "@/hooks/useFolderEditor";
import FolderForm from "@/components/folder/folder-form";

export default function FolderCreate() {
  const { folder, setFolder, onSave, onCancel } = useFolderEditor();

  return (
    <PageWrapper>
      <PageHeader
        title="폴더 생성"
        subTitle="나만의 학습 자료를 모을 수 있는 폴더를 생성해보세요."
      />
      <FolderForm folder={folder} setFolder={setFolder} />
      <PageButtonContainer>
        <Button
          type="button"
          variant="outline"
          color="secondary"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button type="button" color="primary" onClick={onSave}>
          생성
        </Button>
      </PageButtonContainer>
    </PageWrapper>
  );
}
