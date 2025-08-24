import { useMemo, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import Label from "@/components/input/label";
import Button from "@/components/button/button";
import FileInput from "@/components/input/file-input";
import Image from "@/components/ui/image";
import { Input } from "@/components/input/input";
import { useProfileMutation } from "@/hooks/queries/useProfileQuery";
import { useFileUploder } from "@/hooks/useFileUploder";
import { ProfileSchema } from "@/validation/schema";
import type { UserProfile } from "@/api/mapper/types";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import PageButtonContainer from "@/components/layout/page-button-container";

const UserSetting = () => {
  const navigate = useNavigate();
  const storedProfile = useAuthStore((state) => state.profile);
  const setStoredProfile = useAuthStore((state) => state.setProfile);

  if (!storedProfile) {
    return <Navigate to="/auth/login" />;
  }

  const [userProfile, setUserProfile] = useState<UserProfile>(storedProfile);
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useProfileMutation();

  const {
    file,
    preview,
    select,
    clear: clearLocalFile,
    upload,
    mutation: { isPending: isUploading },
  } = useFileUploder({
    defaultUpload: { bucket: "question-bank", folder: "user-profile" },
  });

  const fileRef = useRef<HTMLInputElement | null>(null);

  const onPickFile = () => fileRef.current?.click();

  const onFileChange = (files: FileList) => select(files);

  const onRemoveFile = () => {
    clearLocalFile();
    setUserProfile({ ...userProfile, avatar_url: "" });
  };

  // 취소 시 (추후 취소하시겠습니까? alert 추가 예정)
  const onCancel = () => navigate("/");

  const nameCount = useMemo(
    () => `${userProfile.user_name?.length ?? 0}/60`,
    [userProfile?.user_name]
  );

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setUserProfile((p) => ({ ...p, user_name: v }));
  };

  const onSave = async () => {
    const response = await ProfileSchema.safeParseAsync(userProfile);
    if (!response.success) {
      return;
    }

    // 파일이 있는 경우 : setUserProfile은 비동기 스케줄이라 payload 별도 선언
    let payload: UserProfile = userProfile;
    if (file) {
      const { path } = await upload();
      payload = { ...payload, avatar_url: path };
      setUserProfile(payload);
    }

    await updateProfile(payload);

    clearLocalFile();
  };

  return (
    <PageWrapper>
      <PageHeader
        title="사용자 설정"
        subTitle="나만의 계정 프로필과 관심사를 관리해보세요."
      />
      <section className="card p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Avatar */}
          <div className="md:col-span-6 lg:col-span-5">
            <Label htmlFor="avatar">사용자 아바타</Label>
            <div className="mt-3 flex items-start gap-4">
              <Image
                src={preview ?? undefined}
                path={
                  !preview ? userProfile.avatar_url ?? undefined : undefined
                }
                fallbackSrc="https://placehold.co/96x96?text=Avatar"
                alt="Avatar preview"
                className="h-24 w-24 rounded-2xl object-cover border"
              />
              <div className="flex flex-col gap-2">
                <FileInput
                  className="hidden"
                  ref={fileRef}
                  onSelected={onFileChange}
                />
                <Button type="button" onClick={onPickFile}>
                  이미지 선택
                </Button>
                {(preview || userProfile?.avatar_url) && (
                  <Button
                    type="button"
                    className="btn-outline"
                    onClick={onRemoveFile}
                    disabled={isUpdating || isUploading}
                  >
                    제거
                  </Button>
                )}
                <p className="explain-text">JPG/PNG, 2MB 이하 권장</p>
              </div>
            </div>
          </div>
          {/* Fields */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_name">
                  사용자 이름<span className="ml-1 text-rose-600">*</span>
                </Label>
                <span className="explain-text">{nameCount}</span>
              </div>
              <Input
                id="user_name"
                inputWidth="full"
                className="input mt-2"
                placeholder="이름을 입력하세요"
                value={userProfile?.user_name}
                onChange={onNameChange}
                maxLength={60}
              />
              <p className="explain-text mt-1">
                프로필에 표시될 이름입니다. 최대 60자 권장.
              </p>
            </div>

            {/* <div>
              <Label htmlFor="interests">관심사</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {interests.map((t) => (
                  <span key={t} className="chip">
                    {t}
                    <button
                      type="button"
                      title="remove"
                      className="ml-1 rounded-full px-1 hover:bg-slate-200"
                      onClick={() => removeTag(t)}
                      aria-label={`${t} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <Input
                id="interests"
                className="input mt-2"
                placeholder="관심사를 입력하고 Enter 또는 , 로 추가"
                value={tagDraft}
                onChange={(e: any) => setTagDraft(e.target.value)}
                onKeyDown={onTagKeyDown}
              />
              <p className="mt-1 text-xs text-slate-500">
                예: JavaScript, UI/UX, Kafka
              </p>
            </div> */}
          </div>
        </div>
      </section>
      <PageButtonContainer>
        <Button
          color="secondary"
          onClick={onCancel}
          disabled={isUpdating || isUploading}
        >
          취소
        </Button>
        <Button
          color="primary"
          onClick={onSave}
          disabled={isUpdating || isUploading}
        >
          저장
        </Button>
      </PageButtonContainer>
    </PageWrapper>
  );
};

export default UserSetting;
