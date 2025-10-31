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

        addToMyLIst: (state, action) => {
            const { type, item } = action.payload

            if (!state.myList[type]) state.myList[type] = [];
            
            const exists = state.myList[type].some(i => i._id === item._id)
            if(!exists) {
                state.myList[type].push(item) // Agregar
            } else {
                state.myList[type] = state.myList[type].filter(i => i._id === item._id) // Eliminar
            }

            if(userData && userData.currentProfile) {
                const updated = {
                    ...userData,
                    currentProfile: {
                        ...state,
                        myList: { ...state.myList }
                    }
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
    addToMyLIst, 
    removeFromMyList, 
    clearProfile
} = currentProfileReducer.actions

export default currentProfileReducer.reducer