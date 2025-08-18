import { useRef, useState } from "react";
import Dialog from "@/components/ui/dialog";
import Button from "@/components/button/button";

const SetData = () => {
  const [open, setOpen] = useState<boolean>(false);
  const okRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={okRef} onClick={(e) => setOpen(true)}>
        불러오기
      </Button>
      <Dialog
        open={open}
        titleId="m-title"
        descriptionId="m-desc"
        initialFocusRef={okRef}
      >
        {({ close, panelRef }) => (
          <div
            ref={panelRef}
            className="
        w-full max-w-lg
        bg-white shadow-soft ring-1 ring-slate-200
        focus:outline-none
        sm:rounded-2xl
        rounded-t-2xl  /* 모바일 바텀시트 감성 */
        text-left
      "
            tabIndex={0}
          >
            {/* Header */}
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <h2 id="m-title" className="text-base sm:text-lg font-semibold">
                  학습 세트 데이터 불러오기
                </h2>
                <button
                  onClick={close}
                  aria-label="닫기"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                       hover:bg-slate-100 focus:outline-none
                       focus:ring-[var(--default-ring-width)]
                       focus:ring-[var(--default-ring-color)]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div
              id="m-desc"
              className="px-5 pb-4 pt-3 sm:px-6 sm:pb-4 sm:pt-4 text-slate-600"
            >
              불러올 학습 세트를 선택하거나, 새로 가져오기를 진행하세요.
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button color="secondary" variant="outline" onClick={close}>
                  취소
                </Button>
                <Button color="primary">확인</Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default SetData;
