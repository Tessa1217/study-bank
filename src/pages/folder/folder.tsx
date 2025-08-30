import { lazy, Suspense, useMemo, useRef, type RefObject } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFolderQuery } from "@/hooks/queries/useFolderQuery";
import { useToggle } from "@/hooks/useToggle";
import { BookA, Plus } from "lucide-react";
import Button from "@/components/button/button";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";
import { useFolderSetsQuery } from "@/hooks/queries/useFolderSetQuery";
import SetList from "@/components/set/set-list";

const FolderAddNewSetModal = lazy(
  () => import("@/pages/folder/folder-add-new-set")
);

export default function FolderPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { data: folder, isLoading } = useFolderQuery(folderId);
  const { data: setList } = useFolderSetsQuery(folderId);
  const [open, setOpen] = useToggle(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const setAddedToFolder = useMemo(
    () => setList?.filter(({ addedToFolder }) => !!addedToFolder) || [],
    [setList]
  );

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
          <Button color="primary" onClick={() => navigate("/sets/new")}>
            학습 세트 만들기
          </Button>
          {setAddedToFolder.length > 0 && (
            <AddStudySetButton
              open={open}
              setOpen={setOpen}
              buttonRef={buttonRef}
              folderId={folder.id!}
            />
          )}
        </PageButtonContainer>
      </PageHeader>
      <div className="flex p-10 flex-col gap-3 justify-center items-center bg-white m-1">
        {setAddedToFolder.length > 0 ? (
          <SetList folderId={folder.id!} setList={setAddedToFolder} />
        ) : (
          <>
            <div className="flex">
              <BookA size={30} />
              <BookA size={30} />
              <BookA size={30} />
            </div>
            <p>학습 자료를 추가해서 폴더를 완성해보세요.</p>
            <AddStudySetButton
              open={open}
              setOpen={setOpen}
              buttonRef={buttonRef}
              folderId={folder.id!}
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
}

function AddStudySetButton({
  folderId,
  buttonRef,
  open,
  setOpen,
}: {
  folderId: string;
  buttonRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  setOpen: (v?: boolean) => void;
}) {
  return (
    <>
      <Button
        ref={buttonRef}
        color="primary"
        variant="outline"
        className="flex gap-3"
        onClick={() => setOpen(true)}
      >
        학습 자료 추가하기
        <Plus />
      </Button>
      {open && (
        <Suspense fallback={""}>
          <FolderAddNewSetModal
            folderId={folderId}
            open={open}
            setOpen={setOpen}
            buttonRef={buttonRef}
          />
        </Suspense>
      )}
    </>
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
