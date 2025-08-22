import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useFolderQuery } from "@/hooks/queries/useFolderQuery";
import { BookA } from "lucide-react";
import Button from "@/components/button/button";

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
      <div className="page">
        <h1 className="page-header">폴더를 찾을 수 없어요</h1>
        <p className="explain-text">
          링크가 유효하지 않거나 접근 권한이 없을 수 있어요.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
      </div>
    );
  }

  // 성공
  const { name, description } = folder;

  return (
    <div className="page">
      <h1 className="page-header">{name}</h1>
      <div className="text-gray-700 whitespace-pre-wrap">
        {description || "설명이 없습니다."}
      </div>
      <div className="flex p-10 flex-col gap-3 justify-center items-center bg-white m-1">
        <div className="flex">
          <BookA size={30} />
          <BookA size={30} />
          <BookA size={30} />
        </div>
        <p>학습 자료를 추가해서 폴더를 완성해보세요.</p>
        <NavLink className="btn-primary" to={"/set/new"}>
          학습 자료 추가하기
        </NavLink>
      </div>
    </div>
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
