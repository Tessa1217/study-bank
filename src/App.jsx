import { RouterProvider } from "react-router-dom";
import GlobalAlert from "@/components/feedback/global-alert";
import router from "@/routes/routes";
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <GlobalAlert />
    </>
  );
}

export default App;
