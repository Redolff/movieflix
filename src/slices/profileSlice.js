import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null,
    name: null,
    avatar: null,
    myList: {
        movies: [],
        series: [],
        games: []
    }
}

const userData = JSON.parse(localStorage.getItem('user-movieflix'))     

export const currentProfileReducer = createSlice({
    name: 'currentProfile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const { _id, name, avatar, myList } = action.payload;
            state._id = _id;
            state.name = name;
            state.avatar = avatar;
            state.myList = myList || { movies: [], series: [], games: [] };

            if(userData) {
                const updated = { ...userData, currentProfile: { _id, name, avatar, myList } }
                localStorage.setItem('user-movieflix', JSON.stringify(updated))
            }

        },

        updatedMyList: (state, action) => {
            const { profile } = action.payload

            if(!profile) return ;
            state._id = profile._id
            state.name = profile.name
            state.avatar = profile.avatar
            state.myList = profile.myList

            if(userData) {
                const updated = {
                    ...userData,
                    currentProfile: profile
                }
                localStorage.setItem('user-movieflix', JSON.stringify(updated))
            }
        },

        clearProfile: (state) => {
            state._id = null
            state.name = null,
            state.avatar = null,
            state.myList = { movies: [], series: [], games: [] }

            if(userData && userData.currentProfile) {
                const { currentProfile, ...rest } = userData
                localStorage.setItem('user-movieflix', JSON.stringify(rest))
            }
        }
    }
})

export const { 
    setProfile, 
    updatedMyList, 
    clearProfile
} = currentProfileReducer.actions

export default currentProfileReducer.reducer