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

        },

        updatedMyList: (state, action) => {
            const { profile } = action.payload

            if(!profile) return ;
            state._id = profile._id
            state.name = profile.name
            state.avatar = profile.avatar
            state.myList = profile.myList
        },

        clearProfile: (state) => {
            state._id = null
            state.name = null,
            state.avatar = null,
            state.myList = { movies: [], series: [], games: [] }
        }
    }
})

export const { 
    setProfile, 
    updatedMyList, 
    clearProfile
} = currentProfileReducer.actions

export default currentProfileReducer.reducer