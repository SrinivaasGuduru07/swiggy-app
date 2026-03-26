import { useState,useEffect } from "react";

import { MENU_API } from "../utils/constants";

const RestaurantMenu = ()=>{

    const[resInfo,setResInfo] = useState(null);

    useEffect(()=>{
        fetchMenu();
    },[])

    const fetchMenu = async ()=>{
        const data = await fetch("https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=841660");

        const json = await data.json();
        console.log(json);
        setResInfo(json);
    };



const { 
    name,
    cuisines,
    avgRating,
    costForTwoMessage
   } = resInfo?.data?.cards[2]?.card?.card?.info;



    return(
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(" , ")}-{costForTwoMessage}</p>
            <h1>{avgRating}</h1>
            

            
        </div>
    )
}

export default RestaurantMenu;