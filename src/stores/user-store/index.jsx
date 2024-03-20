import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";






export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    console.log("fetchUser")
    localStorage.getItem("token")
    console.log(localStorage.getItem("token"))
    console.log("deneme")


    return Promise.resolve({id: 1, name: "John Doe"})
})



export const login = createAsyncThunk('auth/login', async (userData) => {
    console.log(userData)
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        if(response.data.status == "success") {
            localStorage.setItem("token", response.data.token)
        }

        return response.data.message
        
    } catch (error) {
        console.error('Login error:', error);
        return error.response.data.message 
    }
});

export const {reducer, actions }  = createSlice({
    name: 'user',
    initialState: {
        userLoginData: {},
        loading: false,
        user: null,
        error: null,
        token: "",
        setToken: () => {}
    },
    reducers: {},
    extraReducers: 
    (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading= false
            state.error = null
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.user = null;
            state.loading= false
            state.error = action.payload
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading= false
            state.error = null
        })
    },
    
});

