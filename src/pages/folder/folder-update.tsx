import { useParams, Navigate } from "react-router-dom";
import { useFolderEditor } from "@/hooks/useFolderEditor";
import { useFolderQuery } from "@/hooks/queries/useFolderQuery";
import Button from "@/components/button/button";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";
import FolderForm from "@/components/folder/folder-form";
import LoadingSpinner from "@/components/ui/loading";

export default function FolderUpdate() {
  const { folderId } = useParams();

  if (!folderId) {
    return <Navigate to="/library" />;
  }

  const { data: initialFolder, isLoading } = useFolderQuery(folderId);

  const {
    folder,
    setFolder,
    onSave: onUpdate,
    onCancel,
  } = useFolderEditor(initialFolder);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageWrapper>
      <PageHeader
        title="폴더 수정"
        subTitle="나만의 폴더를 나에게 더 맞게 수정해보세요."
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
        <Button type="button" color="primary" onClick={onUpdate}>
          수정
        </Button>
      </PageButtonContainer>
    </PageWrapper>
  );
}
