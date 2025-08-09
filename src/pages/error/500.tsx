import Button from "@/components/button/button";
import { Link } from "react-router-dom";

const ServerErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16 text-center">
      <h1 className="text-7xl font-bold text-red-600 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        서버 오류가 발생했습니다
      </h2>
      <p className="text-gray-500 mb-8">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Link to="/">
        <Button color="blue" size="lg">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
};

export default ServerErrorPage;
