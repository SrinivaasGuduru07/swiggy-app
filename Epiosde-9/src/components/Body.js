import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import { SWIGGY_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = ()=>{
const[listOfRestaurants,setListOfRestaurant] = useState([]);
const[filteredRestaurant,setFilteredRestaurant] = useState([]);

const[searchText,setSearchText] = useState("");

//when the body component it completely rendered the useEffect callback fucntion will be called.
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        const data =await fetch(SWIGGY_API)
        const json = await data.json();

        

        setListOfRestaurant(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
         
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus===false) return <h1>You are offline!!!!</h1>


    return listOfRestaurants.length === 0 ?(
        <Shimmer/>
    ) :  (
        <div className="body">
            <div className="filter">

                <div className="search">

                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}
                    />
                    <button 
                        onClick = {()=>{
                            const filteredRestaurant = listOfRestaurants.filter((res)=>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            )

                            setFilteredRestaurant(filteredRestaurant)
                        }}

                        >SEARCH</button>

                </div>

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
                    filteredRestaurant.map((restaurant)=>(

                        <Link key={restaurant.info.id} 
                        to={"/restaurants/"+restaurant.info.id}>

                            <RestaurantCard 
                            
                            resData={restaurant}/>          
                        </Link>


                    ))
                }
           
            </div>

        </div>
    )
}

export default Body;

//https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

//conditional rendering
 /*   if(listOfRestaurants.length === 0){
        return <Shimmer/>;
    }
*/