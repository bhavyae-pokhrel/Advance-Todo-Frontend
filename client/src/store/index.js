import {createSlice,configureStore} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{ signupData:null,isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            state.isLoggedIn=false
        },
        setSignupData(state,value){
            state.signupData=value.payload
        }
    },
})

export const authAction=authSlice.actions

export const store=configureStore({
    reducer:authSlice.reducer,
})




// !MINIMUM CODE REQUIRE FOR CREATE STORE

//^import {createSlice,configureStore} from "@reduxjs/toolkit"

//^ const authSlice=createSlice({
//^    name:"",
//^     initialState:{},
//^     reducers:{},
//^ })

//^ export const authAction=authSlice.actions

//^ export const store=configureStore({
//^     reducer:authSlice.reducers
//^ })