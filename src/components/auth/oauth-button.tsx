import Button from "@/components/button/button";
import { useSignInWithOAuthMutation } from "@/hooks/queries/useAuthQuery";
import type { Provider } from "@/api/auth.api";
import type { ReactNode } from "react";

const OAuthButton = ({
  children,
  provider,
}: {
  children: ReactNode;
  provider: Provider;
}) => {
  const { mutateAsync: oAuthLogin } = useSignInWithOAuthMutation(provider);

  const onClick = async () => {
    await oAuthLogin();
  };

  return (
    <Button width="full" size="lg" color="gray" onClick={onClick}>
      {children}
    </Button>
  );
};

export default OAuthButton;
