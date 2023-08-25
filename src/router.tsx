import { createBrowserRouter } from "react-router-dom";
import { HomePage, SuccessPage } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

export default router;
