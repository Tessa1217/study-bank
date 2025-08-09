import { Outlet } from "react-router-dom";
const LoginLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left : Login Content Section */}
      <main className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <Outlet />
      </main>
      {/* Right: Auth Illustration Section */}
      <aside className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-12">
        <div className="flex flex-col items-center text-center space-y-8 max-w-md">
          <h3 className="text-2xl text-[#2b6cb0] font-bold leading-relaxed">
            나만의 학습 공간, <br />
            <span className="text-3xl text-blue-600">Question Bank</span>
            <br />
            나만의 학습 자료를 만들고, 다양한 학습 도구를 통해 공부해보세요.
            <br />
            로그인하고, 바로 시작하세요.
          </h3>

          <div className="rounded-full overflow-hidden w-64 h-64 shadow-lg">
            <img
              src="/illustration/login-illustration.png"
              alt="로그인 일러스트"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default LoginLayout;
