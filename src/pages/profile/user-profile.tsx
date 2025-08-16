import { useState, useRef } from "react";
import { Input } from "@/components/input/input";
import Label from "@/components/input/label";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";
import type { UserProfile } from "@/api/mapper/types";
import Button from "@/components/button/button";

const UserSetting = () => {
  const profile = useAuthStore((state) => state.profile);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(profile);

  const fileRef = useRef(null);

  const onFileChange = () => {};

  const onPickFile = () => {};

  if (!profile) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="page">
      <h2 className="page-header">사용자 설정</h2>
      <p className="page-sub-header">
        나만의 계정 프로필과 관심사를 관리해보세요.
      </p>
      <section className="card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Avatar */}
          <div className="md:col-span-4 lg:col-span-3">
            <Label htmlFor="avatar">사용자 아바타</Label>
            <div className="mt-3 flex items-start gap-4">
              <img
                src={profile.avatar_url}
                alt="Avatar preview"
                className="h-24 w-24 rounded-2xl object-cover border"
              />
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
                <Button type="button" onClick={onPickFile} disabled={true}>
                  이미지 선택
                </Button>
                {profile.avatar_url && (
                  <Button
                    type="button"
                    className="btn-outline"
                    onClick={() => setUserProfile(userProfile)}
                    disabled={true}
                  >
                    제거
                  </Button>
                )}
                <p className="text-xs text-slate-500">JPG/PNG, 2MB 이하 권장</p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_name">
                  사용자 이름<span className="ml-1 text-rose-600">*</span>
                </Label>
                <span className="text-xs text-slate-500">0</span>
              </div>
              <Input
                id="user_name"
                inputWidth="full"
                className="input mt-2"
                placeholder="이름을 입력하세요"
                // aria-describedby={nameHelpId}
                // aria-invalid={!!error && !userName.trim()}
                // value={userName}
                // onChange={(e: any) => setUserName(e.target.value)}
                maxLength={60}
              />
              <p className="mt-1 text-xs text-slate-500">
                프로필에 표시될 이름입니다. 최대 40자 권장.
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
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="bio">소개</Label>
              <textarea
                id="bio"
                className="input mt-2 h-28 resize-y"
                placeholder="간단한 소개를 작성하세요 (선택)"
                maxLength={300}
                // @ts-ignore (Input과 동일한 스타일을 쓰기 위해 textarea 직접 사용)
                value={userProfile?.bio ?? ""}
                onChange={(e) =>
                  setUserProfile((p) =>
                    p ? ({ ...p, bio: e.target.value } as UserProfile) : p
                  )
                }
              />
              <p className="mt-1 text-xs text-slate-500">최대 300자</p>
            </div> */}
          </div>
        </div>
      </section>

      <div className="btn-container">
        <Button color="gray">취소</Button>
        <Button color="purple">저장</Button>
      </div>
    </div>
  );
};

export default UserSetting;
