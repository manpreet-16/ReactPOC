import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../../components/PreAuthPages/Login";
import Signup from "../../components/PreAuthPages/Signup";
import ProtectedComponent from "../components/ProtectedComponent";
import Home from "../../components/PostAuthPages/Home";
import PageNotFound from "../components/PageNotFound";
import RestaurantLayout from "../../components/PostAuthPages/Restaurant/RestaurantLayout";
import ListRestaurant from "../../components/PostAuthPages/Restaurant/ListRestaurant";
import DishLayout from "../../components/PostAuthPages/Dishes/DishLayout";
import DishList from "../../components/PostAuthPages/Dishes/DishList";
import AddDish from "../../components/PostAuthPages/Dishes/AddDish";


const router = createBrowserRouter(
    createRoutesFromElements(
        // <Route path="/">
        // <Route index element={<Login/>}></Route>
        <Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="signup" element={<Signup/>}></Route>
        <Route path="/" element={<ProtectedComponent/>}>
          <Route index element={<Home/>}></Route>
          <Route path="dashboard" element={<Home/>}></Route>

        <Route path="restaurant" element={<RestaurantLayout/>}>
          <Route index element={<ListRestaurant/>}></Route>
          <Route path="list" element={<ListRestaurant/>}></Route>
          {/* <Route path="add" element={<AddRestaurant/>}></Route> */}
        </Route>

        <Route path="restaurant/:id" element={<RestaurantLayout/>}>
          <Route path="dishes" element={<DishLayout/>}>
          <Route index element={<DishList/>}></Route>
          <Route path="add" element={<AddDish/>}></Route>
          <Route path="update/:dishId" element={<AddDish/>}></Route>
        </Route>
        </Route>
        
        </Route>
        <Route path="*" element={<PageNotFound/>}></Route>
        </Route>
    )
  )

  export default router