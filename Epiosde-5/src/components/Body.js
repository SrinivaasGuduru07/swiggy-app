import restaurantList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import {useState} from "react";

const Body = ()=>{
const[listOfRestaurants,setListOfRestaurant] = useState(restaurantList)

    return(
        <div className="body">
            <div className="filter">
                <button 
                    className="filter-btn"
                    onClick={()=>{
                        const filteredList = listOfRestaurants.filter(
                            (res)=>res.info.avgRating > 4
                        )
                        setListOfRestaurant(filteredList)
                    }}>
                    Top Rated Restaurnat
                </button>
            </div>
            <div className="res-container">

                {
                    listOfRestaurants.map((restaurant)=>(
                        <RestaurantCard 
                        key={restaurant.info.id}
                        resData={restaurant}/>
                    ))
                }
           
            </div>

        </div>
    )
}

export default Body;