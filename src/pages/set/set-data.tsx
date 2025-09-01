import { useRef, useMemo, useState, useDeferredValue } from "react";
import { useCardEditor } from "@/components/set/card-editor-context";
import Dialog from "@/components/ui/dialog";
import Button from "@/components/button/button";
import { X } from "lucide-react";
import { RadioGroup, RadioOption } from "@/components/input/radio-group";
import { Input } from "@/components/input/input";

type SetOption = { value: string; children: string | React.ReactNode };
type Row = { word: string; definition: string };

const SetData = () => {
  const [open, setOpen] = useState(false);
  const okRef = useRef<HTMLButtonElement>(null);
  const {
    actions: { addBatchCards },
  } = useCardEditor();

  // 선택된 구분자 키
  const [splitterKey, setSplitterKey] = useState<SetOption["value"]>("space");
  const [cardSplitterKey, setCardSplitterKey] =
    useState<SetOption["value"]>("line-break");
  // 커스텀 문자열
  const [customSplitter, setCustomSplitter] = useState("");
  const [customCardSplitter, setCustomCardSplitter] = useState("");

  const splitters: SetOption[] = [
    { value: "space", children: "Space" },
    { value: "comma", children: "Comma(,)" },
    {
      value: "custom",
      children: (
        <Input
          id="customSplitter"
          name="customSplitter"
          inputWidth="full"
          value={customSplitter}
          disabled={splitterKey !== "custom"}
          onChange={(e) => setCustomSplitter(e.target.value)}
          onClick={() => setSplitterKey("custom")}
          placeholder="예: |"
          
        />
      ),
    },
  ];
  const cardSplitters: SetOption[] = [
    { value: "line-break", children: "다음 줄" },
    { value: "semicolon", children: "쌍반점(;)" },
    {
      value: "custom",
      children: (
        <Input
          id="customCardSplitter"
          name="customCardSplitter"
          inputWidth="full"
          value={customCardSplitter}
          onChange={(e) => setCustomCardSplitter(e.target.value)}
          disabled={cardSplitterKey !== "custom"}
          onClick={() => setCardSplitterKey("custom")}
          placeholder="예: ||"
          
        />
      ),
    },
  ];

  // 실제 구분자 문자열
  const fieldSep = useMemo(() => {
    switch (splitterKey) {
      case "space":
        return " ";
      case "comma":
        return ",";
      case "custom":
        return customSplitter || ","; // 기본 폴백
      default:
        return " ";
    }
  }, [splitterKey, customSplitter]);

  const rowSep = useMemo(() => {
    switch (cardSplitterKey) {
      case "line-break":
        return "\n";
      case "semicolon":
        return ";";
      case "custom":
        return customCardSplitter || "\n";
      default:
        return "\n";
    }
  }, [cardSplitterKey, customCardSplitter]);

  // placeholder 생성
  const textPlaceholder = useMemo(() => {
    const placeholders: [string, string][] = [
      ["단어1", "뜻1"],
      ["단어2", "뜻2"],
      ["단어3", "뜻3"],
    ];
    return placeholders.map((p) => p.join(fieldSep)).join(rowSep);
  }, [fieldSep, rowSep]);

  // 입력/파싱
  const [data, setData] = useState("");
  const deferredData = useDeferredValue(data); // 대용량 대응

  const { rows, errorCount, total } = useMemo(() => {
    const normalized = deferredData.replace(/\r\n?/g, "\n");
    const rawRows = normalized
      .split(rowSep)
      .map((s) => s.trim())
      .filter(Boolean);

    const rows: Row[] = [];
    let errorCount = 0;

    for (const r of rawRows) {
      const parts = r.split(fieldSep).map((s) => s.trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        rows.push({
          word: parts[0],
          definition: parts.slice(1).join(fieldSep),
        });
      } else {
        errorCount++;
      }
    }
    return { rows, errorCount, total: rawRows.length };
  }, [deferredData, fieldSep, rowSep]);

  const onAddBatchCards = () => {
    addBatchCards(rows);
    setOpen(false);
  };

  return (
    <>
      <Button ref={okRef} onClick={() => setOpen(true)}>
        불러오기
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="m-title"
        descriptionId="m-desc"
        initialFocusRef={okRef ?? null}
      >
        {({ close, panelRef }) => (
          <div
            ref={panelRef}
            className="
              w-full max-w-5xl h-full bg-white shadow-soft ring-1 ring-slate-200
              focus:outline-none sm:rounded-2xl rounded-t-2xl text-left
              grid grid-rows-[auto,1fr,auto] max-h-[min(70vh,700px)]
            "
            tabIndex={0}
          >
            {/* Header */}
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <h2 id="m-title" className="text-base sm:text-lg font-semibold">
                  학습 세트 데이터 불러오기
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
            </div>

            {/* Body */}
            <div
              id="m-desc"
              className="px-5 pb-4 pt-3 sm:px-6 sm:pb-4 sm:pt-4 text-slate-700 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* 왼쪽: 입력/설정 */}
                <div className="flex flex-col gap-4 h-full">
                  <div>
                    <h4 className="font-semibold">데이터 붙여넣기</h4>
                    <p className="text-sm text-slate-500">
                      한 줄에 <strong>단어{fieldSep}뜻</strong> 형식. 여러
                      카드는{" "}
                      <strong>
                        {cardSplitterKey === "line-break"
                          ? "다음 줄"
                          : cardSplitterKey}
                      </strong>{" "}
                      기준으로 구분됩니다.
                    </p>
                  </div>
                  <textarea
                    className="textarea w-full h-64"
                    placeholder={textPlaceholder}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <fieldset>
                      <legend className="mb-2 font-semibold">
                        단어 / 뜻 구분자
                      </legend>
                      <RadioGroup
                        value={splitterKey}
                        onChange={setSplitterKey}
                        className="space-y-2"
                        aria-labelledby="field-sep"
                      >
                        {splitters.map(({ value, children }) => (
                          <RadioOption key={value} value={value}>
                            <div className="flex items-center gap-2">
                              {children}
                            </div>
                          </RadioOption>
                        ))}
                      </RadioGroup>
                    </fieldset>

                    <fieldset>
                      <legend className="mb-2 font-semibold">카드 구분</legend>
                      <RadioGroup
                        value={cardSplitterKey}
                        onChange={setCardSplitterKey}
                        className="space-y-2"
                        aria-labelledby="row-sep"
                      >
                        {cardSplitters.map(({ value, children }) => (
                          <RadioOption key={value} value={value}>
                            <div className="flex items-center gap-2">
                              {children}
                            </div>
                          </RadioOption>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                  <div className="text-sm text-slate-600" aria-live="polite">
                    총 {total}줄 / 파싱 {rows.length}개
                    {errorCount > 0 && (
                      <span className="ml-2 text-amber-600">
                        오류 {errorCount}건
                      </span>
                    )}
                  </div>
                </div>
                {/** 미리보기 영역 */}
                <div className="h-full overflow-auto rounded-xl border bg-slate-50 p-3">
                  <h5 className="mb-3 font-semibold text-slate-700">
                    미리보기
                  </h5>
                  <ul className="space-y-2">
                    {!rows?.length ? (
                      <li className="text-center">
                        학습 데이터를 입력해주세요.
                      </li>
                    ) : (
                      rows.slice(0, 50).map((pd, idx) => (
                        <li key={`${pd.word}-${idx}`}>
                          <PreviewCard
                            word={pd.word}
                            definition={pd.definition}
                          />
                        </li>
                      ))
                    )}
                  </ul>
                  {rows.length > 50 && (
                    <div className="mt-2 text-xs text-slate-500">
                      +{rows.length - 50}개 더 있음
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button color="secondary" variant="outline" onClick={close}>
                  취소
                </Button>
                <Button color="primary" onClick={onAddBatchCards}>
                  확인
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

const PreviewCard = ({ word, definition }: Row) => {
  return (
    <div className="w-full rounded-xl border bg-white p-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <div className="text-xs text-slate-500">단어</div>
          <div
            className="mt-1 rounded-lg bg-slate-100 px-2 py-1 truncate"
            title={word}
          >
            {word || <span className="text-slate-400">—</span>}
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500">뜻</div>
          <div
            className="mt-1 rounded-lg bg-slate-100 px-2 py-1 truncate"
            title={definition}
          >
            {definition || <span className="text-slate-400">—</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetData;
