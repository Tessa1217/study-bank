import { NavLink } from "react-router-dom";
import { Library, FolderOpen, BarChart3, Settings, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import type { StudyFolderRow } from "@/api/repository/studyFolder.repository";
import { getStudyFolders } from "@/api/folder.api";

const SideLink = ({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
          isActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-50"
        }`
      }
    >
      <span className="text-slate-500">{icon}</span>
      {children}
    </NavLink>
  );
};

const SideSection = ({
  menuName,
  menuTitle,
  children,
}: {
  menuName: string;
  menuTitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <div aria-label={menuName} role="menu">
      <div className="h-[1px] bg-gray-300 mb-3"></div>
      {menuTitle && <div className="mb-3">{menuTitle}</div>}
      {children}
    </div>
  );
};

const Sidebar = () => {
  const [userFolders, setUserFolders] = useState<StudyFolderRow[]>([]);

  useEffect(() => {
    const fetchStudyFolder = async () => {
      const { data } = await getStudyFolders();
      if (data) {
        setUserFolders(data);
      }
    };
    fetchStudyFolder();
  }, []);
  return (
    <nav className="mt-4 flex flex-col gap-1 h-full">
      <SideSection menuName="main-menu">
        <SideLink to="/dashboard" icon={<BarChart3 size={18} />}>
          대시보드
        </SideLink>
        <SideLink to="/sets/1" icon={<Library size={18} />}>
          내 세트
        </SideLink>
      </SideSection>
      <SideSection menuName="folder-menu" menuTitle="내 폴더">
        <SideLink to="/folder/new" icon={<FolderOpen size={18} />}>
          폴더 생성
        </SideLink>
        {userFolders.map((folder) => (
          <SideLink
            key={folder.id}
            to={`/folder/${folder.id}`}
            icon={<Folder size={18} />}
          >
            {folder.name}
          </SideLink>
        ))}
      </SideSection>
      <SideSection menuName="setting-menu">
        <SideLink to="#" icon={<Settings size={18} />}>
          설정
        </SideLink>
      </SideSection>
    </nav>
  );
};

export default Sidebar;
