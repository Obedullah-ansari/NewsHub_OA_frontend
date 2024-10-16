import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Allapp from "./Allapp";
import Header from "./pages/Header";
import Signup  from "./pages/Auth/Signup"


const router = createBrowserRouter([
  { path: "/", element: <Allapp /> },
  { path: "/topheadlines", element: <Header /> },
  {path :"/authorization", element : <Signup/>},

]);

function App() {
  return (
    <>
       <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
