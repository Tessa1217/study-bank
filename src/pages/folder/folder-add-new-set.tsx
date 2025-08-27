import type { RefObject } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useFolderAvailableSetsQuery } from "@/hooks/queries/useFolderSetQuery";
import { X } from "lucide-react";
import Button from "@/components/button/button";
import SetList from "@/components/set/set-list";
import Dialog from "@/components/ui/dialog";

type FolderAddNewSetProps = {
  folderId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export default function FolderAddNewSet({
  folderId,
  open,
  setOpen,
  buttonRef,
}: FolderAddNewSetProps) {
  const userId = useAuthStore((state) => state.profile?.id);
  const { data: setList } = useFolderAvailableSetsQuery(userId, folderId);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      titleId="m-title"
      descriptionId="m-desc"
      initialFocusRef={buttonRef ?? null}
    >
      {({ close, panelRef }) => (
        <div
          ref={panelRef}
          className="
             w-full max-w-5xl h-full max-h-[min(70vh,700px)] bg-white shadow-soft ring-1 ring-slate-200
             focus:outline-none sm:rounded-2xl rounded-t-2xl text-left
          "
          tabIndex={0}
        >
          <div className="px-5 pt-5 sm:px-6 sm:pt-6 h-full">
            <div className="flex items-start justify-between gap-4">
              <h2 id="m-title" className="text-base sm:text-lg font-semibold">
                학습 자료 추가하기
              </h2>
              <Button
                onClick={close}
                color="secondary"
                variant="ghost"
                aria-label="Close"
                className="inline-flex items-center rounded-xl"
              >
                <X />
              </Button>
            </div>
            <div className="overflow-y-auto h-[80%]">
              <div
                id="m-desc"
                className="px-5 pb-4 pt-3 sm:px-6 sm:pb-4 sm:pt-4 text-slate-700"
              >
                <div className="h-full">
                  <SetList folderId={folderId} setList={setList} />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <Button
                color="primary"
                size="md"
                className="rounded-full"
                onClick={close}
              >
                추가 완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
