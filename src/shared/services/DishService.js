import { ADD_DISH, DELETE_DISH, GET_DISH, GET__ALL_DISHES, UPDATE_DISH } from "../routes/ApiRoutes"
import { apiClient } from "../routes/axiosConfiguration"

export const getAllDishes = async (currentPage,foodcategory,id) =>{
   return apiClient.get(GET__ALL_DISHES+`?PageNumber=${currentPage}&PageSize=10&FoodCategoryId=${foodcategory}&RestaurantId=${id}`)
}
export const deleteDishById = async (id) =>{
    return apiClient.delete(DELETE_DISH+"/"+id)
}

export const getDishByID = async (dishId) =>{
    return apiClient.get(GET_DISH+"/"+dishId)
}

export const updateDish = async (payload) => {
    return apiClient.put(UPDATE_DISH,payload) 
}

export const addDish = async (payload) =>{
    return apiClient.post(ADD_DISH,payload)
}