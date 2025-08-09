import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex-shrink-0">
            {/* 로고 */}
            <a href="/" className="text-xl font-bold text-indigo-600">
              Quizlet
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {/* 네비게이션 링크 */}
            <a
              href="/studyroom"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              스터디룸
            </a>
            <a
              href="/profile"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              프로필
            </a>
            {/* 로그인/로그아웃 버튼 */}
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
              로그인
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Outlet: 중첩된 라우트가 렌더링되는 곳 */}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © 2025 Quizlet Clone. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
