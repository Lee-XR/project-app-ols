import { createStore } from "vuex"
import VuexPersistence from "vuex-persist"

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})

function initialState(){
    return {
        userId: null,
        userName: null,
        userEmail: null,
        userDob: null,
        userGender: null,
        userGrade: null,
        userProfilePic: null
    }
}

const store = createStore({
    state: initialState(),
    mutations:{
        userExist(state, payload){
            state.userId = payload.userInfo.userId,
            state.userName = payload.userInfo.userName,
            state.userEmail = payload.userInfo.userEmail,
            state.userDob = payload.userInfo.userDob,
            state.userGender = payload.userInfo.userGender,
            state.userGrade = payload.userInfo.userGrade,
            state.userProfilePic = payload.userInfo.userProfilePic
        },
        updateUser(state, payload){
            state.userName = payload.userName,
            state.userEmail = payload.userEmail,
            state.userDob = payload.userDob,
            state.userGender = payload.userGender,
            state.userGrade = payload.userGrade,
            state.userProfilePic = payload.userProfilePic
        },
        resetUser(state){
            Object.assign(state, initialState())
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store