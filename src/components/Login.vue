<template>
    <div class="flex flex-col justify-center px-10 py-3 w-1/2 h-full relative text-center dark:text-gray-200">
        <div class="mt-5 mx-auto pb-2 w-full text-center border-b-4 border-black drop-shadow-md dark:border-gray-200">
            <h1 class="text-5xl"><b>LOGIN</b></h1>
        </div>
        <p class="mx-auto my-5 text-left">Enter your <b>email</b> and <b>password</b> to access your account</p>
        
        <!-- Login input form -->
        <form action="post">
            <div class="my-4 relative">
                <input type="email" v-model="email" required class="border-2 border-slate-200 rounded-full w-full px-3 pt-2 drop-shadow-sm focus:outline-none focus:border-primary dark:bg-gray-700">
                <label class="absolute -top-3 left-4 px-1 bg-white dark:bg-gray-700 dark:text-gray-200">Email:</label>
            </div>
            <div class="my-4 relative">
                <input type="password" v-model="password" required class="border-2 border-slate-200 rounded-full w-full px-3 pt-2 drop-shadow-sm focus:outline-none focus:border-primary dark:bg-gray-700">
                <label class="absolute -top-3 left-4 px-1 bg-white dark:bg-gray-700 dark:text-gray-200">Password:</label>
            </div>
            <div class="relative">
                <button @click.prevent="login" class="bg-primary text-white w-fit px-8 py-1 mx-auto mt-5 mb-7 border-2
                border-primary rounded-full transition duration-100 ease-in-out
                hover:bg-white hover:text-primary hover:scale-110
                focus:outline-none focus:bg-white focus:text-primary focus:scale-110">
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-2"/>
                    Login
                </button>

                <Transition
                enter-active-class="duration-200 ease-in-out"
                enter-from-class="opacity-0 translate-y-5"
                leave-active-class="duration-500 ease-in-out"
                leave-to-class="opacity-0 translate-y-5">
                <div v-if="loginError" class="rounded-2xl border-4 border-red-600 bg-red-400
                absolute inset-x-0 top-16 mx-auto h-fit w-fit p-1 text-center flex flex-col justify-center">
                    <span class="text-white text-xl">
                        <b>{{ errorMsg }}</b>
                    </span>
                </div>
            </Transition>
            </div>
        </form>
        <hr class="h-px mb-7 bg-black dark:bg-gray-200">

        <!-- Link to register new account -->
        <a @click="$emit('register', true)" class="text-primary underline decoration-solid cursor-pointer w-fit mx-auto mb-8
                hover:text-tertiary transition duration-100 ease-in-out dark:text-secondary dark:hover:text-tertiary">
            <span class="mr-4">New user? Register an account</span>
            <font-awesome-icon icon="fa-arrow-right" />
        </a>
    </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default{
    name: 'LoginVue',
    emits: ['register'],
    setup(){
        const email = ref(null)
        const password = ref(null)
        const errorMsg = ref(null)
        const loginError = ref(false)
        const successMsg = ref(null)
        const router = useRouter()
        const store = useStore()

        // POST to login script
        const login = async () => {
            const data = {
                'email': email.value,
                'password': password.value
            }
            loginError.value = false
            await axios.post('login.php', data)
                .then(res => { return res.json() })
                .then((response) => {
                    if(response.error){
                        errorMsg.value = response.msg
                        loginError.value = true
                        setTimeout(()=>{
                            loginError.value = false
                        }, 5000)
                    } else {
                        store.commit('userExist', response)
                        router.push('/')
                    }
                })
                .catch((error) => {
                    if(error){
                        loginError.value = true
                        if(error.response){
                            errorMsg.value = 'Error: ' + error.response.status + ' ' + error.response.statusText
                        } else if(error.request){
                            errorMsg.value = 'Error: ' + error.request
                        } else {
                            errorMsg.value = 'Error: ' + error.message
                        }
                        setTimeout(() => {
                            loginError.value =  !loginError.value
                        }, 5000)
                    }
                })
        }

        return { email, password, login, loginError, errorMsg, successMsg }
    }
}
</script>
