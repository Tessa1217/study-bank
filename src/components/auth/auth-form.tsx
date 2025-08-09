import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type Credentials } from "@/hooks/useSupabaseAuth";
import Label from "@/components/input/label";
import { Input } from "@/components/input/input";

interface AuthFormProps {
  handleAuthFormSubmit: (
    data: Credentials,
    onSuccessRedirect: () => void
  ) => Promise<unknown>;
  successRedirect: string;
  formButton: React.ReactNode;
}
const AuthForm = ({
  handleAuthFormSubmit,
  successRedirect,
  formButton,
}: AuthFormProps) => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Credentials>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: Credentials) => {
    handleAuthFormSubmit(data, () => navigate(successRedirect));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <Label htmlFor="email">이메일</Label>
        <Input inputWidth="full" {...register("email", { required: true })} />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          inputWidth="full"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      {formButton}
    </form>
  );
};

export default AuthForm;
