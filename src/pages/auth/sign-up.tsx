import { useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/button/button";
import { useSignUpMutation } from "@/hooks/queries/useAuthQuery";
import AuthFormDivider from "@/components/ui/divider";
import AuthForm from "@/components/auth/auth-form";
import OAuthButton from "@/components/auth/oauth-button";
import type { Credential } from "@/hooks/queries/useAuthQuery";
import { CredentialSchema } from "@/validation/schema";

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState<Credential>({
    email: "",
    password: "",
  });

  const { mutateAsync: signUp, status } = useSignUpMutation(signUpInfo);

  const onClick = async () => {
    const res = await CredentialSchema.safeParseAsync(signUpInfo);
    if (res.success) {
      signUp();
    }
  };

  const onKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

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
        authInfo={signUpInfo}
        onChange={(changeType, e) =>
          setSignUpInfo({ ...signUpInfo, [changeType]: e.target.value })
        }
      >
        <Button
          width="full"
          size="lg"
          color="green"
          disabled={status === "pending"}
          onClick={onClick}
          onKeyDown={onKeydown}
        >
          {status === "pending" ? "회원가입 중..." : "회원가입"}
        </Button>
      </AuthForm>
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
