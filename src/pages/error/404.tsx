import Button from "@/components/button/button";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16 text-center">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-8">
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
      </p>
      <Link to="/">
        <Button color="blue" size="lg">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
