import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signInOAuth, signInWithPassword, signOut, signUp } from "@/api/auth.api";
import type { Provider } from "@/api/auth.api";

export type Credential = {
  email: string;
  password: string;
};

export const useSignUpMutation = ({email, password}:{email: string; password: string}) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await signUp({email, password})
      return data
    },
    onSuccess: () => {
      navigate("/auth/login") 
    }
  })
}

export const useSignInWithPasswordMutation = ({email, password}:{email: string; password: string;}) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => {
      const { data } = await signInWithPassword({email, password})
      return data
    },
    onSuccess: () => {
      navigate("/") 
    }
  })
}

export const useSignInWithOAuthMutation = (provider:Provider) => {
  return useMutation({
    mutationFn: async () => {
      await signInOAuth(provider)
    },
  })
}

export const useSignOutMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => {
      await signOut()
    },
    onSuccess: () => {
      navigate("/auth/login")
    }
  })
}