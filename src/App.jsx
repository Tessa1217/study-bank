import { useFetchProfile } from "@/hooks/useFetchProfile.ts";
import { RouterProvider } from "react-router-dom";
import GlobalAlert from "@/components/feedback/global-alert";
import router from "@/routes/routes";
function App() {
  useFetchProfile();
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <GlobalAlert />
    </>
  );
}

export default App;
