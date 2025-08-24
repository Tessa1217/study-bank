import { useParams, useNavigate } from "react-router-dom";
import { useFolderQuery } from "@/hooks/queries/useFolderQuery";
import { BookA, Plus } from "lucide-react";
import Button from "@/components/button/button";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";

export default function FolderPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { data: folder, isLoading } = useFolderQuery(folderId);

  // 렌더링 분기
  if (isLoading) {
    return <FolderSkeleton />;
  }

  if (!folder) {
    return (
      <PageWrapper>
        <PageHeader
          title="폴더를 찾을 수 없어요."
          subTitle="링크가 유효하지 않거나 접근 권한이 없을 수 있어요."
        >
          <PageButtonContainer>
            <Button variant="outline" onClick={() => navigate(-1)}>
              뒤로 가기
            </Button>
          </PageButtonContainer>
        </PageHeader>
      </PageWrapper>
    );
  }

  // 성공
  const { name, description } = folder;

  return (
    <PageWrapper>
      <PageHeader title={name} subTitle={description ?? ""}>
        <PageButtonContainer>
          <Button
            color="secondary"
            variant="outline"
            onClick={() => navigate(`/folders/${folderId}/edit`)}
          >
            수정
          </Button>
          <Button color="primary" onClick={() => navigate("/set/new")}>
            학습 세트 만들기
          </Button>
        </PageButtonContainer>
      </PageHeader>
      <div className="flex p-10 flex-col gap-3 justify-center items-center bg-white m-1">
        <div className="flex">
          <BookA size={30} />
          <BookA size={30} />
          <BookA size={30} />
        </div>
        <p>학습 자료를 추가해서 폴더를 완성해보세요.</p>
        <Button
          color="primary"
          variant="outline"
          className="flex gap-3"
          onClick={() => navigate("/set/new")}
        >
          학습 자료 추가하기
          <Plus />
        </Button>
      </div>
    </PageWrapper>
  );
}

function FolderSkeleton() {
  return (
    <div className="page">
      <div className="skeleton-container h-7 w-40" />
      <div className="skeleton-container h-5 w-64" />
      <div className="skeleton-container h-10 w-48" />
    </div>
  );
}
