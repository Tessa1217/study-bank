import { Search, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center gap-3 p-3">
        <button className="lg:hidden rounded-xl border px-3 py-2">메뉴</button>
        <div className="relative flex-1">
          <input className="input pl-9" placeholder="세트 검색..." />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        </div>
        <Link to="/folder/new" className="btn-primary gap-2 flex align-middle">
          <Plus className="size-4" />
          새로 만들기
        </Link>
        <button className="btn-outline">
          <User className="size-4" />
        </button>
      </div>
    </header>
  );
}
