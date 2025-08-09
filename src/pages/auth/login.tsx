import OAuthButton from "@components/auth/oauth-button";
import { signInWithPassword } from "@/hooks/useSupabaseAuth";
import Button from "@/components/button/button";
import { Link } from "react-router-dom";
import AuthFormDivider from "@/components/auth/auth-form-divider";
import AuthForm from "@/components/auth/auth-form";

const Login = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">로그인</h1>
      <OAuthButton provider="github">
        <div className="flex justify-center items-center gap-2">
          <span>GitHub로 계속하기</span>
        </div>
      </OAuthButton>
      <AuthFormDivider dividerText="또는 이메일로 로그인" />
      <AuthForm
        handleAuthFormSubmit={signInWithPassword}
        successRedirect="/"
        formButton={
          <Button type="submit" width="full" size="lg" color="blue">
            로그인
          </Button>
        }
      />
      <div className="text-center text-sm text-gray-600">
        아직 회원이 아니신가요?{" "}
        <Link to="/auth/sign-up" className="font-bold underline text-gray-700">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
