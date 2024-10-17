import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Allapp from "./Allapp";
import Header from "./pages/Header";
import Signup  from "./pages/Auth/Signup"


const router = createBrowserRouter([
  { path: "/NewsHub_OA_frontend", element: <Allapp /> },
  { path: "/NewsHub_OA_frontend/topheadlines", element: <Header /> },
  {path :"/NewsHub_OA_frontend/authorization", element : <Signup/>},

]);

function App() {
  return (
    <>
       <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
