import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { StudyFolderRow } from "@/api/folder.api";
import { useFolderService } from "@/hooks/services/useFolderService";
import { useStatusState } from "@/hooks/useStateWithStatus";

export default function FolderPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { getStudyFolder } = useFolderService();
  const { state, setLoading, setEmpty, setSuccess } =
    useStatusState<StudyFolderRow>();

  useEffect(() => {
    if (!folderId) {
      setEmpty();
      return;
    }

    (async () => {
      setLoading();
      const data = await getStudyFolder(folderId);
      data ? setSuccess(data) : setEmpty();
    })();
  }, [folderId]);

  // 렌더링 분기
  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className="space-y-6">
        <div className="h-7 w-40 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-64 rounded bg-gray-200 animate-pulse" />
        <div className="h-10 w-48 rounded bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (state.status === "empty" || state.status === "error") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">폴더를 찾을 수 없어요</h1>
        <p className="text-sm text-gray-600">
          링크가 유효하지 않거나 접근 권한이 없을 수 있어요.
        </p>
        <button className="btn-outline" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </div>
    );
  }

  // 성공
  const { name, description } = state.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="text-gray-700 whitespace-pre-wrap">
        {description || "설명이 없습니다."}
      </div>
      <div>
        <button className="btn-primary">학습 자료 추가하기</button>
      </div>
    </div>
  );
}
