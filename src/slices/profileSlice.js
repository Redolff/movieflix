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

        addToMyLIst: (state, action) => {
            const { type, item } = action.payload

            if (!state.myList[type]) state.myList[type] = [];
            
            const exists = state.myList[type].some(i => i._id === item._id)
            if(!exists) {
                state.myList[type].push(item) // Agregar
            } else {
                state.myList[type] = state.myList[type].filter(i => i._id === item._id) // Eliminar
            }
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
    addToMyLIst, 
    removeFromMyList, 
    clearProfile
} = currentProfileReducer.actions

export default currentProfileReducer.reducer