import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFolderListQuery } from "@/hooks/queries/useFolderQuery";
import { useSetListQuery } from "@/hooks/queries/useSetQuery";
import type { StudyFolderSummary, StudySetSummary } from "@/api/mapper/types";
import { ArrowRight, FolderIcon, LibraryIcon, Plus } from "lucide-react";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";
import Button from "@/components/button/button";
const Library = () => {
  const navigate = useNavigate();
  const {
    data: studyFolderList = [],
    isLoading: studyFolderLoading,
    isError: studyFolderError,
    error: folderErr,
  } = useFolderListQuery();
  const {
    data: studySetList = [],
    isLoading: studySetLoading,
    isError: studySetError,
    error: setErr,
  } = useSetListQuery();

  const hasFolders = useMemo(
    () => studyFolderList.length > 0,
    [studyFolderList]
  );
  const hasSets = useMemo(() => studySetList.length > 0, [studySetList]);

  const loading = studyFolderLoading || studySetLoading;

  return (
    <PageWrapper>
      <PageHeader
        title="내 라이브러리"
        subTitle="나만의 학습 자료들을 만들고 한눈에 확인해보세요."
      >
        <PageButtonContainer>
          <Button
            variant="outline"
            color="secondary"
            className="flex items-center gap-2"
            onClick={() => navigate("/folders/new")}
          >
            <Plus />새 폴더
          </Button>
          <Button
            color="primary"
            className="flex items-center gap-2"
            onClick={() => navigate("/sets/new")}
          >
            <Plus />새 학습 세트
          </Button>
        </PageButtonContainer>
      </PageHeader>
      {/* Folders */}
      <Section
        title="내 폴더"
        action={
          <Button
            variant="outline"
            color="secondary"
            className="flex gap-2"
            onClick={() => navigate("/folders/new")}
          >
            폴더 만들러 가기 <ArrowRight />
          </Button>
        }
      >
        {loading ? (
          <Grid>
            {Array.from({ length: 3 }).map((_, idx) => (
              <FolderSkeleton key={`folder_skelecton_${idx}`} />
            ))}
          </Grid>
        ) : hasFolders ? (
          <Grid>
            {studyFolderList.map(({ id, name, description }) => (
              <FolderCard
                key={id}
                id={id}
                name={name}
                description={description}
              />
            ))}
          </Grid>
        ) : (
          <Empty
            icon={<FolderIcon />}
            title="나만의 폴더를 생성해보세요"
            desc="폴더는 여러 학습 세트를 묶어 한 번에 볼 수 있습니다. 아래 버튼을 눌러 폴더를 생성해보세요."
            cta={
              <Button
                variant="outline"
                color="secondary"
                className="flex gap-2"
                onClick={() => navigate("/folders/new")}
              >
                폴더 만들러 가기 <ArrowRight />
              </Button>
            }
          />
        )}
      </Section>

      {/* Sets */}
      <Section
        title="내 학습 세트"
        action={
          <Button
            color="primary"
            className="flex gap-2"
            onClick={() => navigate("/folders/new")}
          >
            학습 세트 만들러 가기 <ArrowRight />
          </Button>
        }
      >
        {loading ? (
          <Grid>
            {Array.from({ length: 4 }).map((_, idx) => (
              <SetSkeleton key={`set_skeleton_${idx}`} />
            ))}
          </Grid>
        ) : hasSets ? (
          <Grid>
            {studySetList.map(({ id, title, description, isPublic }) => (
              <SetCard
                key={id}
                id={id}
                title={title}
                isPublic={isPublic}
                description={description ?? ""}
              />
            ))}
          </Grid>
        ) : (
          <Empty
            icon={<LibraryIcon />}
            title="나만의 학습 세트를 생성해보세요"
            desc="학습 세트는 용어와 뜻을 하나의 세트로 묶어 학습할 수 있는 단위입니다."
            cta={
              <Button
                color="primary"
                className="flex gap-2"
                onClick={() => navigate("/folders/new")}
              >
                학습 세트 만들러 가기 <ArrowRight />
              </Button>
            }
          />
        )}
      </Section>
    </PageWrapper>
  );
};

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1 sm:px-0">
        <h2 className="text-[18px] sm:text-[22px] font-bold leading-tight tracking-[-0.015em]">
          {title}
        </h2>
        {action ? (
          <div className="flex items-center gap-2">{action}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        grid gap-3
        grid-cols-1
        [@media(min-width:520px)]:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {children}
    </div>
  );
}

function Empty({
  icon,
  title,
  desc,
  cta,
}: {
  icon?: React.ReactNode;
  title: string;
  desc?: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[#d7d1e6] p-10 text-center">
      {icon ? <div className="opacity-70">{icon}</div> : null}
      <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
        {title}
      </p>
      {desc ? (
        <p className="text-sm text-slate-600 max-w-prose">{desc}</p>
      ) : null}
      {cta ? <div className="pt-1">{cta}</div> : null}
    </div>
  );
}

function FolderCard({ id, name, description }: StudyFolderSummary) {
  return (
    <Link
      to={`/folders/${id}`}
      className="card group flex flex-col gap-2 p-4 hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <FolderIcon className="opacity-80" size={18} />
        <h4 className="font-semibold truncate">{name}</h4>
      </div>
      <p className="text-xs text-slate-600">{description}</p>
    </Link>
  );
}

function SetCard({ id, title, description }: StudySetSummary) {
  return (
    <Link
      to={`/set/${id}`}
      className="card group flex flex-col gap-3 p-4 hover:shadow-md"
    >
      <h4 className="font-semibold truncate">{title}</h4>
      <p className="text-sm text-slate-700 line-clamp-2 break-words">
        {description || "설명이 없습니다."}
      </p>
      <div className="mt-auto flex justify-end gap-2 align-middle">
        <span className="text-xs text-slate-500 group-hover:text-slate-700">
          세트 보러 가기
        </span>
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}

function FolderSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-4 w-1/3 rounded bg-slate-200 mb-2" />
      <div className="h-3 w-1/4 rounded bg-slate-200" />
    </div>
  );
}

function SetSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-4 w-2/3 rounded bg-slate-200 mb-3" />
      <div className="h-3 w-full rounded bg-slate-200 mb-2" />
      <div className="h-3 w-4/5 rounded bg-slate-200" />
    </div>
  );
}

export default Library;
