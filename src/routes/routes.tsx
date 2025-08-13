import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import NotFoundPage from "@/pages/error/404";
import ServerErrorPage from "@/pages/error/500";
import GuardedRoute from "@components/routes/guarded-route";

// lazy import
const DefaultLayout = lazy(() => import("@/components/layout/default-layout"));
const LoginLayout = lazy(() => import("@/components/layout/login-layout"));
const Login = lazy(() => import("@/pages/auth/login"));
const SignUp = lazy(() => import("@/pages/auth/sign-up"));
const Profile = lazy(() => import("@/pages/profile/user-profile"));
const Main = lazy(() => import("@/pages/studyroom/main"));
const Folder = lazy(() => import("@/pages/folder/folder"));
const FolderNew = lazy(() => import("@/pages/folder/folder-new"));
const SetNew = lazy(() => import("@/pages/set/set-new"));
const router = createBrowserRouter([
  {
    element: <GuardedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "folder/new",
            element: <FolderNew />,
          },
          {
            path: "folder/:folderId",
            element: <Folder />,
          },
          {
            path: "set/new",
            element: <SetNew />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginLayout />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
