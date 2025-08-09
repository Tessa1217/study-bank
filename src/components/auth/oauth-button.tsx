import Button from "@/components/button/button";
import { signInOAuth, type Provider } from "@/hooks/useSupabaseAuth";
import type { ReactNode } from "react";

const OAuthButton = ({
  children,
  provider,
}: {
  children: ReactNode;
  provider: Provider;
}) => {
  return (
    <Button
      width="full"
      size="lg"
      color="gray"
      onClick={() => signInOAuth(provider)}
    >
      {children}
    </Button>
  );
};

export default OAuthButton;
