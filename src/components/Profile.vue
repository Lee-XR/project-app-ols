<template>
    <div class="mx-32 my-2 py-1 flex justify-center items-start dark:text-gray-200">
        <!-- Profile picture -->
        <Transition appear 
        enter-active-class="duration-500 delay-300 ease-in-out"
        enter-from-class="opacity-0 translate-y-10">
            <div class="col-span-1 h-80 w-1/4 rounded-[50%] overflow-hidden border-4 border-primary dark:border-secondary">
                <img v-if="noPic" :src="url + 'profilePics/default%20profile.jpg'" alt="default profile pic" class="h-full w-full object-cover">
                <img v-else :src="url + 'profilePics/' + userInfo.user_profilePic" alt="user profile pic" class="h-full w-full object-cover">
            </div>
        </Transition>

        <!-- Profile details -->
        <Transition appear
        enter-active-class="duration-500 delay-500 ease-in-out"
        enter-from-class="opacity-0 -translate-x-10">
            <div class="h-80 w-1/2 ml-14 grid grid-cols-11 items-center">
                <div class="col-span-1 justify-self-center">
                    <font-awesome-icon icon="fa-solid fa-user" class="h-11 text-primary dark:text-secondary" />
                </div>
                <div class="col-span-9 col-start-3">
                    <h4 class="text-4xl break-all font-bold"><b>{{ userInfo.user_name }}</b></h4>
                </div>
                <div class="col-span-1 justify-self-center">
                    <font-awesome-icon icon="fa-solid fa-envelope" class="h-11 text-primary dark:text-secondary" />
                </div>
                <div class="col-span-9 col-start-3">
                    <h4 class="text-2xl italic"><i>{{ userInfo.user_email }}</i></h4>
                </div>
                <div class="col-span-1 justify-self-center">
                    <font-awesome-icon icon="fa-solid fa-graduation-cap" class="h-11 text-primary dark:text-secondary" />
                </div>
                <div class="col-span-9 col-start-3">
                    <h4 class="text-2xl">Form {{ userInfo.user_grade }}</h4>
                </div>
                <div class="col-span-1 justify-self-center">
                    <font-awesome-icon icon="fa-solid fa-calendar" class="h-11 text-primary dark:text-secondary" />
                </div>
                <div class="col-span-4 col-start-3">
                    <h4 class="text-2xl">{{ userInfo.user_dob }}</h4>
                </div>
                <div class="col-span-1 col-start-8 justify-self-center">
                    <font-awesome-icon icon="fa-solid fa-venus-mars" class="h-11 text-primary dark:text-secondary" />
                </div>
                <div class="col-span-2  col-start-10">
                    <h4 class="text-2xl">{{ userInfo.user_gender }}</h4>
                </div>
            </div>
        </Transition>

        <!-- Edit profile button -->
        <div class="col-span-1 mt-4 w-1/4 flex justify-center">
            <button @click="showModal = true" class="px-2 py-px flex justify-center items-center border-2 border-primary rounded-full 
            bg-primary text-white transition duration-100 ease-in-out hover:bg-white hover:text-primary 
            hover:scale-105 focus-visible:outline-none focus-visible:bg-white focus-visible:text-primary">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="h-5 mr-2"/>
                <span class="text-lg">Edit Profile</span>
            </button>
        </div>

        <Teleport to="body">
            <ModalVue :show="showModal" @close="showModal = false">
                <form method="post" enctype="multipart/form-data" class="w-full h-full px-5 flex flex-col justify-evenly">
                    <div class="mt-5 grid grid-cols-6 items-start">
                        <span class="text-xl col-span-1"><b>Profile Picture:</b></span>
                        <div class="flex items-center justify-center w-full col-span-5 col-start-2">
                            <label class="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 hover:border-primary dark:border-gray-500 dark:hover:border-gray-200 dark:hover:bg-gray-400">
                                <div class="flex flex-row items-center justify-center py-5">
                                    <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" class="w-10 h-10 text-primary"/>
                                    <span class="flex flex-col justify-center items-center ml-4">
                                        <p class="text-sm text-gray-500 dark:text-black"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-black">PNG or JPG</p>
                                    </span>
                                </div>
                                <input required type="file" @change="picUpload($event)" />
                            </label>
                        </div> 
                    </div>
                    <div class="grid grid-cols-6 items-center">
                        <span class="text-xl col-span-1 tracking-wider"><b>Username:</b></span>
                        <input v-model="userInfo.user_name" required type="text" class="col-span-5 border-2 
                        border-slate-200 rounded-full w-full px-3 drop-shadow-sm 
                        focus:outline-none focus:border-primary dark:text-black">
                    </div>
                    <div class="grid grid-cols-6 items-center">
                        <span class="text-xl col-span-1 tracking-wider"><b>Email:</b></span>
                        <input v-model="userInfo.user_email" required type="text" class="col-span-5 border-2 
                        border-slate-200 rounded-full w-full px-3 drop-shadow-sm 
                        focus:outline-none focus:border-primary dark:text-black">
                    </div>
                    <div class="grid grid-cols-6 items-center">
                        <span class="text-xl col-span-1 tracking-wider"><b>Current Password:</b></span>
                        <input v-model="oldPw" required type="password" class="col-span-5 border-2 
                        border-slate-200 rounded-full w-full px-3 drop-shadow-sm 
                        focus:outline-none focus:border-primary dark:text-black">
                    </div>
                    <div class="grid grid-cols-6 items-center">
                        <span class="text-xl col-span-1 tracking-wider"><b>New Password:</b></span>
                        <input v-model="newPw" required type="password" class="col-span-5 border-2 
                        border-slate-200 rounded-full w-full px-3 drop-shadow-sm 
                        focus:outline-none focus:border-primary dark:text-black">
                    </div>
                    <div class="grid grid-cols-6 items-center gap-x-">
                        <span class="text-xl col-span-1 tracking-wider"><b>D.O.B:</b></span>
                        <input v-model="userInfo.user_dob" required type="date" class="col-span-1 border-2 
                        border-slate-200 rounded-full w-full px-3 drop-shadow-sm 
                        focus:outline-none focus:border-primary dark:text-black">
                        
                        <span class="text-xl col-span-1 tracking-wider justify-self-center"><b>Gender:</b></span>
                        <select v-model="userInfo.user_gender" required class="col-span-1 border-2 border-slate-200 rounded-full w-full px-3 
                        drop-shadow-sm focus:outline-none focus:border-primary dark:text-black">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>

                        <span class="text-xl col-span-1 tracking-wider justify-self-center"><b>Grade:</b></span>
                        <select v-model="userInfo.user_grade" required class="col-span-1 border-2 border-slate-200 rounded-full w-full px-3 
                        drop-shadow-sm focus:outline-none focus:border-primary dark:text-black">
                            <option v-for="grade in 5" :key="grade" :value="grade">Form {{ grade }}</option>
                        </select>
                    </div>

                    <div class="flex justify-end items-center h-10">
                        <Transition
                            enter-active-class="duration-300 ease-in-out"
                            enter-from-class="opacity-0 translate-x-8"
                            leave-active-class="duration-300 ease-in-out"
                            leave-to-class="opacity-0 translate-x-8">
                            <div v-show="modalError" class="rounded-lg border-4 border-red-600 bg-red-400
                            px-2 py-1 mr-5 text-center text-white text-lg">
                                <b>{{ modalErrorMsg }}</b>
                            </div>
                        </Transition>
                        <button @click.prevent="editProfile" class="bg-primary text-white w-fit h-fit px-8 border-2
                        border-primary rounded-full hover:bg-white hover:text-primary hover:scale-x-105">
                            <font-awesome-icon icon="fa-solid fa-floppy-disk" class="mr-3" />
                            <span class="text-lg">Save</span>
                        </button>
                    </div>
                </form>
            </ModalVue>
        </Teleport>
    </div>
</template>

<script>
import ModalVue from './Modal.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'ProfileVue',
    components: { ModalVue },
    setup(){
        const url = process.env.VUE_APP_DEPLOY_URL
        const userId = ref()
        const userInfo = ref({})
        const noPic = ref()
        const showModal = ref(false)
        const profilePic = ref()
        const oldPw = ref()
        const newPw = ref()
        const modalError = ref(false)
        const modalErrorMsg = ref()
        const store = useStore()

        onMounted(() => {
            getUserProfile()
        })

        const getUserProfile = () => {
            userId.value = store.state.userId
            userInfo.value = {
                'user_name': store.state.userName,
                'user_email': store.state.userEmail,
                'user_dob': store.state.userDob,
                'user_gender': store.state.userGender,
                'user_grade': store.state.userGrade,
                'user_profilePic': store.state.userProfilePic
            }
            if(store.state.userProfilePic === null || store.state.userProfilePic === ""){
                noPic.value = true
            } else {
                noPic.value = false 
            }
        }

        const picUpload = (e) => {
            profilePic.value = e.target.files[0]
        }

        const editProfile = async () => {
            const data = {
                'userId': userId.value,
                'email': userInfo.value.user_email,
                'username': userInfo.value.user_name,
                'oldPw': oldPw.value,
                'newPw': newPw.value,
                'dob': userInfo.value.user_dob,
                'gender': userInfo.value.user_gender,
                'grade': userInfo.value.user_grade
            }
            const formData = new FormData()
            formData.append('data', JSON.stringify(data))
            if(profilePic.value){
                formData.append('changePic', true)
                formData.append('profilePic', profilePic.value)
            } else {
                formData.append('changePic', false)
            }
            await axios.post('editProfile.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((response) => {
                if(response.data.error === true){
                    modalError.value = true
                    modalErrorMsg.value = response.data.msg
                    setTimeout(() => {
                        modalError.value =  !modalError.value
                    }, 5000)
                } else if(response.data.error === false){
                    const updatedData = ref({
                        'userName': userInfo.value.user_name,
                        'userEmail': userInfo.value.user_email,
                        'userDob': userInfo.value.user_dob,
                        'userGender': userInfo.value.user_gender,
                        'userGrade': userInfo.value.user_grade,
                        'userProfilePic': profilePic.value ? profilePic.value.name : store.state.userProfilePic
                    })
                    store.commit('updateUser', updatedData.value)
                    getUserProfile()
                    showModal.value = !showModal.value
                    oldPw.value = null
                    newPw.value = null
                }
            })
            .catch((error) => {
                modalError.value = true
                if(error.response){
                    modalErrorMsg.value = 'Error: ' + error.response.status + ' ' + error.response.statusText
                } else if(error.request){
                    modalErrorMsg.value = 'Error: ' + error.request
                } else {
                    modalErrorMsg.value = 'Error: ' + error.message
                }
                setTimeout(() => {
                    modalError.value =  !modalError.value
                }, 5000)
            })
        }

        return { url, userInfo, showModal, profilePic, oldPw, newPw, modalError, modalErrorMsg,
                editProfile, picUpload, noPic }
    }
}
</script>
