import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useSignInWithPasswordMutation } from "@/hooks/queries/useAuthQuery";
import type { Credentials } from "@/api/mapper/types";
import { CredentialSchema } from "@/validation/schema";
import OAuthButton from "@components/auth/oauth-button";
import Button from "@/components/button/button";
import AuthFormDivider from "@/components/ui/divider";
import AuthForm from "@/components/auth/auth-form";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<Credentials>({
    email: "",
    password: "",
  });

  const { mutateAsync: signInWithPassword, status } =
    useSignInWithPasswordMutation(loginInfo);

  const onClick = async () => {
    const res = await CredentialSchema.safeParseAsync(loginInfo);
    if (res.success) {
      signInWithPassword();
    }
  };

  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className="w-full max-w-md page">
      <h1 className="text-3xl font-bold text-gray-800 text-center">로그인</h1>
      <OAuthButton provider="github">
        <div className="flex justify-center items-center gap-2">
          <span>GitHub로 계속하기</span>
        </div>
      </OAuthButton>
      <AuthFormDivider dividerText="또는 이메일로 로그인" />
      <AuthForm
        authInfo={loginInfo}
        onChange={(changeType, e) =>
          setLoginInfo({ ...loginInfo, [changeType]: e.target.value })
        }
        onKeydown={onKeydown}
      >
        <Button
          width="full"
          size="lg"
          color="blue"
          disabled={status === "pending"}
          onClick={onClick}
        >
          {status === "pending" ? "로그인 중..." : "로그인"}
        </Button>
      </AuthForm>
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
