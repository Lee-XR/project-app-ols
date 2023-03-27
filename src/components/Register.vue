<template>
    <div class="flex flex-col justify-center px-5 py-1  w-1/2 my-3 relative dark:text-gray-200">
        <div class="flex flex-row justify-start items-baseline">

            <!-- Back to login button -->
            <button @click="$emit('register', false)" class="hover:text-primary 
            hover:scale-125 transition duration-100 ease-in-out focus:outline-none 
            focus:text-primary focus:scale-125">
                <font-awesome-icon icon="fa-solid fa-arrow-left" class="h-7" />
            </button>
            <div class="mt-5 mx-auto pb-2 w-full text-center border-b-4 border-black drop-shadow-md dark:border-gray-200">
                <h1 class="text-5xl"><b>REGISTER</b></h1>
            </div>
        </div>
        <p class="mx-auto my-5 text-center">Enter your <b>personal details</b> to register your account
        </p>

        <!-- Register input form -->
        <form action="post" class="text-center">
            <div class="mb-4 relative">
                <input type="text" v-model="email" required class="border-2 border-slate-200 rounded-full 
                w-full px-3 pt-2 drop-shadow-sm focus:outline-none focus:border-primary dark:bg-gray-700">
                <label class="absolute -top-3 left-4 bg-white dark:bg-gray-700 dark:text-gray-200">Email:</label>
            </div>
            <div class="mb-4 relative">
                <input type="text" v-model="username" required class="border-2 border-slate-200 rounded-full 
                w-full px-3 pt-2 drop-shadow-sm focus:outline-none focus:border-primary dark:bg-gray-700">
                <label class="absolute -top-3 left-4 bg-white dark:bg-gray-700 dark:text-gray-200">Username:</label>
            </div>
            <div class="mb-2 relative">
                <input type="password" v-model="password" required class="border-2 border-slate-200 rounded-full 
                w-full px-3 pt-2 drop-shadow-sm focus:outline-none focus:border-primary dark:bg-gray-700">
                <label class="absolute -top-3 left-4 bg-white dark:bg-gray-700 dark:text-gray-200">Password:</label>
            </div>
            <div class=" flex flex-row justify-start text-left">
                <div>
                <label>D.O.B:</label>
                <input type="date" v-model="dob" required class="border-2 border-slate-200 drop-shadow-md 
                focus:outline-none focus:border-primary dark:bg-gray-700">
                </div>
                <div>
                    <label>Gender:</label>
                    <select v-model="gender" required class="mt-1 border-2 border-slate-200 drop-shadow-md 
                    focus:outline-none focus:border-primary dark:bg-gray-700">
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div>
                    <label>Grade:</label>
                    <select v-model="grade" required class="mt-1 border-2 border-slate-200 drop-shadow-md 
                    focus:outline-none focus:border-primary dark:bg-gray-700">
                        <option value=1>Form 1</option>
                        <option value=2>Form 2</option>
                        <option value=3>Form 3</option>
                        <option value=4>Form 4</option>
                        <option value=5>Form 5</option>
                    </select>
                </div>
            </div>
            
            <div class="relative">
                <button @click.prevent="register"
                class="bg-primary text-white w-fit px-8 py-1 mx-auto mt-5 mb-2 border-2
                rounded-full border-primary hover:bg-white hover:text-primary hover:scale-110
                transition duration-100 ease-in-out focus:outline-none focus:text-primary
                focus:bg-white focus:scale-110">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-2" />
                    Register
                </button>

                <Transition
                    enter-active-class="duration-100 ease-in-out"
                    enter-from-class="opacity-0 translate-y-5"
                    leave-active-class="duration-500 ease-in-out"
                    leave-to-class="opacity-0 translate-y-5">
                    <div v-if="registerError" class="rounded-2xl border-4 border-red-600 bg-red-400 h-fit w-fit p-1
                    absolute inset-x-0 mx-auto top-full text-center flex flex-col justify-center">
                        <span class="text-white text-xl">
                            <b>{{ errorMsg }}</b>
                        </span>
                    </div>
                </Transition>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default{
    name: 'RegisterVue',
    emits: ['register'],
    setup(){
        const email = ref(null)
        const username = ref(null)
        const password = ref(null)
        const dob = ref(null)
        const gender = ref(null)
        const grade = ref(null)
        const errorMsg = ref()
        const registerError = ref(false)
        const router = useRouter()
        const store = useStore()

        // POST to register script
        const register = async() => {
            const data = {
                'email': email.value,
                'username': username.value,
                'password': password.value,
                'dob': dob.value,
                'gender': gender.value,
                'grade': grade.value
            }
            await axios.post('register.php', data)
            await fetch(process.env.VUE_APP_DEPLOY_URL + '/register.php')
            .then(res => { return res.json() })
            .then((response) => {
                if(response.error === true){
                    errorMsg.value = response.msg
                    registerError.value = true
                    setTimeout(()=>{
                        registerError.value = false
                    }, 5000)
                } else if(response.error === false) {
                    store.commit('userExist', response)
                    router.push('/')
                }
            })
            .catch((error) => {
                if(error){
                    registerError.value = true
                    if(error.response){
                        errorMsg.value = 'Error: ' + error.response.status + ' ' + error.response.statusText
                    } else if(error.request){
                        errorMsg.value = 'Error: ' + error.request
                    } else {
                        errorMsg.value = 'Error: ' + error.message
                    }
                    setTimeout(() => {
                        registerError.value =  !registerError.value
                    }, 5000)    
                }   
            })
        }

        return { register, errorMsg, registerError, email, username, password, dob, gender, grade }
    }
}
</script>