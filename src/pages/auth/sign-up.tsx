import { Link } from "react-router-dom";
import Button from "@/components/button/button";
import { signUp } from "@/hooks/useSupabaseAuth";
import AuthFormDivider from "@/components/auth/auth-form-divider";
import AuthForm from "@/components/auth/auth-form";
import OAuthButton from "@/components/auth/oauth-button";
const SignUp = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">회원가입</h1>
      <OAuthButton provider="github">
        <div className="flex justify-center items-center gap-2">
          <span>GitHub로 계속하기</span>
        </div>
      </OAuthButton>
      <AuthFormDivider dividerText="또는 이메일로 회원가입" />
      <AuthForm
        handleAuthFormSubmit={signUp}
        successRedirect="/auth/login"
        formButton={
          <Button type="submit" width="full" size="lg" color="green">
            회원가입
          </Button>
        }
      />
      <div className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link to="/auth/login" className="font-bold underline text-gray-700">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
