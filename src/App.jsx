import { useFetchProfile } from "@/hooks/useFetchProfile.ts";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/routes";
function App() {
  useFetchProfile();
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
