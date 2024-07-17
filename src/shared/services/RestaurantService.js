import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_ALL_RESTAURANTS, GET_RESTAURANT_BY_ID, UPDATE_RESTAURANT } from "../routes/ApiRoutes"
import { apiClient } from "../routes/axiosConfiguration"

export const getAllRestaurants = async (pageNumber,pageSize) =>{
   return apiClient.get(GET_ALL_RESTAURANTS+`?PageNo=${pageNumber}&PageSize=${pageSize}`)
}

export const deleteRestaurant = async (id) =>{
    return apiClient.delete(DELETE_RESTAURANT+'/'+id)
}

export const getRestaurantByid = async (restaurantId) =>{
    return apiClient.get(GET_RESTAURANT_BY_ID+'/'+restaurantId)
}

export const updateRestaurant = async (payload) => {
    return apiClient.put(UPDATE_RESTAURANT,payload)
}

export const addRestaurant = async (payload) =>{
    return apiClient.post(ADD_RESTAURANT,payload)
}