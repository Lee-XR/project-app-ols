<template>
  <div class="relative">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Roboto', 'sans-serif';
  margin: 0;
}

nav a.router-link-active .active {
  background-color: #0da9fa;
  color: #1836f5;
}

nav a.router-link-active .active:hover {
  background-color: #0da9fa;
  color: white;
}

nav a.router-link-active .active div {
  opacity: 100%;
}

</style>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {
  setup(){
    const router = useRouter()
    const store = useStore()

    // Interceptor to redirect unauthorised users to login page
    axios.interceptors.response.use((response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      if(error.response.status === 401){
          store.commit('resetUser')
          router.push('/login')
          return Promise.reject(error)
      } else if(error.response.status === 400){
          const data = { 'userId': store.state.userId }

          // await axios.post('refresh.php', data, {
          //   headers:{
          //   'withCredentials': true,
          //      'Content-Type': 'application/x-www-form-urlencoded'
          //  }
          // })
          await fetch(process.env.VUE_APP_DEPLOY_URL + 'refresh.php', {
            method: "POST",
            mode: "cors",
            credentials: true,
            body: JSON.stringify(data)
          })
          .catch((error) => {
            if(error){
              store.commit('resetUser')
              router.push('/login')
            }
          })
          return axios(originalRequest)
      }
      return Promise.reject(error)
    })
  }
}
</script>
