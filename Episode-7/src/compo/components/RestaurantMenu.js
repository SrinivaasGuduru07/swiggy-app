import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import { MENU_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = ()=>{

    const[resInfo,setResInfo] = useState(null);

    const{resId} = useParams();
    console.log(resId);

    useEffect(()=>{
        fetchMenu();
    },[])

    const fetchMenu = async ()=>{
        const data = await fetch(MENU_API+resId);

        const json = await data.json();
        console.log(json);
        setResInfo(json);
    };

if(resInfo === null) return <Shimmer/>

const { name,cuisines,avgRating,costForTwoMessage} = resInfo?.data?.cards[2]?.card?.card?.info;


const{itemCards} = resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;
console.log(itemCards);
    return(
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(" , ")}-{costForTwoMessage}</p>
            <h1>{avgRating}</h1>
            
            <h2>MENU</h2>
            
            <ul>

                {itemCards.map((item)=>(

                    <li key={item.card.info.id}>{item.card.info.name} - {"Rs"}  


                    {item.card.info.defaultPrice/100 || item.card.info.price/100}
                    </li>))}
            
            </ul>
            

            
        </div>
    )
}

export default RestaurantMenu;


/*    <li>{itemCards[0].card.info.name}</li>
                <li>{itemCards[1].card.info.name}</li>
                <li>{itemCards[2].card.info.name}</li>
                <li>{itemCards[3].card.info.name}</li> 
 */