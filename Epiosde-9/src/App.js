import React ,{lazy,Suspense}from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
//import Grocery from "./components/Grocery";

import { createBrowserRouter ,RouterProvider,Outlet} from "react-router-dom";

const Grocery = lazy(()=> import("./components/Grocery"));

const AppLayout = ()=>{
    return(
        <div className="app">
            <Header/>
            <Outlet/>
        </div>
    )
}

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children : [
    {
        path:"/about",
        element:<About/>,
    },
    {
        path:"/contact",
        element:<Contact/>,
    },
    {
        path:"/",
        element:<Body/>,
    },
    {
        path:"/restaurants/:resId",
        element:<RestaurantMenu/>,
    },
        {
        path:"/grocery",
        element:(<Suspense fallback={<h1>Loading....</h1>}>
                <Grocery/>
        </Suspense>
        )
    },

    ],
        errorElement:<Error/>
    },

])
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>)

/*Extensions:
1.prettier-code formatter
2.Bracket Pair colorization
 */