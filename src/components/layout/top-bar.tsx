import UserSetting from "@/components/layout/user-setting";
import { Search, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="size-4">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
        QuestionBank
      </h2>
    </div>
  );
}

const TopLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className="text-[#120e1b] text-sm font-medium leading-normal"
    >
      {children}
    </NavLink>
  );
};

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭으로 모바일 패널 닫기
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#ebe8f3]">
      <div className="flex items-center justify-between gap-4 px-4 md:px-10 py-3">
        <div className="flex items-center gap-3 md:gap-8">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
            aria-label="메뉴 열기"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <TopLink to="/">홈</TopLink>
            <TopLink to="/library">내 라이브러리</TopLink>
            <TopLink to="/folder/new">만들기</TopLink>
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-72 lg:max-w-96">
            <div className="flex w-full items-stretch rounded-lg h-full bg-[#ebe8f3]">
              <div className="text-brand-700 flex items-center justify-center pl-3">
                <Search className="size-5" aria-hidden="true" />
              </div>
              <input
                placeholder="Search"
                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#120e1b] bg-[#ebe8f3]
                           focus:outline-0 focus:ring-0 border-none h-full placeholder:text-brand-700 px-3 rounded-l-none"
              />
            </div>
          </label>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
            aria-label="검색 열기"
            aria-pressed={showSearch}
            onClick={() => setShowSearch((v) => !v)}
          >
            <Search className="size-5" />
          </button>
          <UserSetting />
        </div>
      </div>
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <label className="flex flex-col h-10">
            <div className="flex w-full items-stretch rounded-lg h-full bg-[#ebe8f3]">
              <div className="text-brand-700 flex items-center justify-center pl-3">
                <Search className="size-5" aria-hidden="true" />
              </div>
              <input
                autoFocus
                placeholder="Search"
                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#120e1b] bg-[#ebe8f3]
                           focus:outline-0 focus:ring-0 border-none h-full placeholder:text-brand-700 px-3 rounded-l-none"
              />
            </div>
          </label>
        </div>
      )}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`md:hidden overflow-hidden transition-[max-height] duration-300
                    ${open ? "max-h-64" : "max-h-0"}`}
      >
        <nav className="px-4 pb-3 flex flex-col gap-2">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm font-medium"
          >
            홈
          </NavLink>
          <NavLink
            to="/library"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm font-medium"
          >
            내 라이브러리
          </NavLink>
          <NavLink
            to="/folder/new"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm font-medium"
          >
            폴더 만들기
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
