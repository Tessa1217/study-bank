import { useForm, type SubmitHandler } from "react-hook-form";
import { useFolderService } from "@/hooks/services/useFolderService";
import { useAuthStore } from "@/store/useAuthStore";
type FormValues = {
  name: string;
  description?: string;
};

export default function FolderNew() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { insertStudyFolder } = useFolderService();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      return;
    }
    insertStudyFolder({ ...data, user_id: user.id });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">폴더 생성</h1>
      <form
        className="card grid gap-4 max-w-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-1">
          <label className="text-sm font-medium">폴더명 *</label>
          <input
            className="input"
            placeholder="예: TOEIC 단어장"
            {...register("name", { required: true })}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">설명</label>
          <textarea
            className="input min-h-24"
            placeholder="폴더에 대한 설명"
            {...register("description")}
          />
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium">대표 색상</label>
            <select className="select" >
              <option>Indigo</option>
              <option>Emerald</option>
              <option>Rose</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">공개 여부</label>
            <select className="select">
              <option>비공개</option>
              <option>공개</option>
            </select>
          </div>
        </div> */}
        {/* <div className="grid gap-1">
          <label className="text-sm font-medium">세트 추가</label>
          <input className="input" placeholder="세트 검색" />
        </div> */}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-outline">
            취소
          </button>
          <button className="btn-primary">생성</button>
        </div>
      </form>
    </div>
  );
}
