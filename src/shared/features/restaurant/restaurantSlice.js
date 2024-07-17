import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('fetchData',async ()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
    console.log("in thunk response ",response,"..",response.data)
    return response.data;
})

const initialState = {
    isLoading : false,
    error :  null,
    restaurants : [{
        id : 0,
        name:'Rest_1'
    }],
    extraReducers : (builder) =>{
        builder
        .addCase(fetchData.pending,(state,action)=>{
            state.isLoading = true
            console.log("in pending : ",state,"action",action)
        }).addCase(fetchData.fulfilled,(state,action)=>{
            state.isLoading = false
            // state.data = action.payload;
            console.log("in fulfilled : ",state,"action",action)
        }).addCase(fetchData.rejected,(state,action)=>{
            state.isLoading = false
            // state.error = action
            console.log("in rejecting : ",state,"action",action)
        })
    }
}

export const restaurantSlice = createSlice({
    name : 'restaurant',
    initialState,
    reducers : {
        createRestaurant : (state,action) =>{
            console.log("in create restaurant slice ",action)
            state.restaurants.push(action.payload)

        },
        deleteRestaurant : (state,action) =>{
            console.log("in delete restaurant slice ",action)
            state.restaurants = state.restaurants?.filter((x,i) => i != action.payload)
            console.log("final ",state.restaurants)
        }
    }
})

export const { createRestaurant , deleteRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer