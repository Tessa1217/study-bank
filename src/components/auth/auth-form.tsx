import Label from "@/components/input/label";
import { Input } from "@/components/input/input";
import type { ChangeEvent } from "react";
import type { Credential } from "@/hooks/queries/useAuthQuery";

interface AuthFormProps {
  authInfo: Credential;
  onChange: (changeType: string, e: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const AuthForm = ({ authInfo, onChange, children }: AuthFormProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Label htmlFor="email">이메일</Label>
        <Input
          inputWidth="full"
          value={authInfo.email}
          onChange={(e) => onChange("email", e)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          inputWidth="full"
          type="password"
          value={authInfo.password}
          onChange={(e) => onChange("password", e)}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthForm;
