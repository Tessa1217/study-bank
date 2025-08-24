import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useSignOutMutation } from "@/hooks/queries/useAuthQuery";
import { useAuthStore } from "@/store/useAuthStore";
import { useClickOutside } from "@/hooks/useClickOutside";
import clsx from "clsx";
import Image from "@/components/ui/image";
import Button from "@/components/button/button";
import Divider from "@/components/ui/divider";

const UserSetting = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownMenu = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownMenu, () => setOpenDropdown(false));

  const profile = useAuthStore((state) => state.profile);
  const { mutate: signOut } = useSignOutMutation();

  // 스크롤 움직일 경우 메뉴 닫기
  useEffect(() => {
    const closeDropdown = () => setOpenDropdown(false);
    window.addEventListener("scroll", closeDropdown);
    return () => {
      window.removeEventListener("scroll", closeDropdown);
    };
  }, []);

  return (
    <div className="relative group" ref={dropdownMenu}>
      <Button
        id="dropdown-opener"
        color="secondary"
        variant="outline"
        className="btn btn-outline size-10 md:size-auto md:px-3 md:py-2"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <span className="sr-only">내 계정</span>
        <User className="size-5" />
      </Button>
      <div
        className={clsx(
          `absolute z-10 bg-grey-200 right-0`,
          openDropdown ? "block" : "hidden"
        )}
      >
        <div className="p-1 shadow-lg rounded-md bg-white w-[250px] max-w-[250px]">
          <div className="dropdown-menu">
            <ul className="flex flex-col w-full">
              <li className="p-3 flex flex-row justify-between gap-3">
                <div className="aspect-square rounded-full h-15 w-15">
                  <Image
                    path={profile?.avatar_url ?? ""}
                    fallbackSrc="https://placehold.co/96x96?text=Avatar"
                    className="w-full h-full"
                  />
                </div>
                <div className="overflow-hidden text-lg whitespace-nowrap text-ellipsis w-full">
                  <p className="font-semibold">환영합니다!</p>
                  <span>{profile?.user_name} 님</span>
                </div>
              </li>
              <Divider dividerText="" />
              <button
                role="menuitem"
                className="w-full p-3 hover:bg-secondary text-left text-lg cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </button>
              <Link
                role="menuitem"
                to="/profile"
                className="w-full p-3 dropdown-item text-left text-lg hover:bg-secondary"
              >
                사용자 설정
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
