<template>
    <div class="relative mb-24 h-[31rem] shadow-lg">
      <div class="gif-bg w-full h-full bg-gray-400 bg-opacity-30 px-48 py-7 transition duration-100 ease-in-out">
          <div class="flex flex-col justify-center">
              <p class="text-7xl text-center dark:text-gray-100 my-3 tracking-wider"><b>Study-UP</b></p>
              <p class="text-lg text-center mt-3 mb-5 dark:text-gray-100"><b>
                  Enhance your academic learning experience with Study-UP, an online library system web platform for Malaysian students. Looking for a specific topic to complete your homework or assignment? Just use the search bar below... Or browse for more interesting resources through our page. Are you ready to acheive academic excellence with Study-UP?
              </b></p>

              <!-- Search bar -->
              <div class="mt-1 mb-2 py-3 relative" id="searchBar">
                <label class="relative block">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-2 text-slate-400 dark:text-gray-500" />
                  </span>
                  <input type="text" v-model="search" class="placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-500
                  placeholder:text-base block bg-white dark:bg-gray-200 w-full rounded-full py-2 pl-11 pr-3 shadow-sm
                  focus:outline-none" :class="{ 'rounded-b-none': search, 'rounded-t-2xl': search }"
                  placeholder="Enter keywords..." />
                </label>

                <!-- Result dropdown -->
                <div v-if="search" class="absolute w-full bg-white dark:bg-gray-200 rounded-b-2xl pb-2 z-10">
                  <div v-if="resultHit" class="text-base">
                    <div @click="show(resource)" v-for="resource in resources.slice(0, 6)" :key="resource.resourceId" 
                    class="mx-1 my-1 py-1 pl-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 grid grid-cols-4">
                      <span class="col-span-2"><font-awesome-icon icon="fa-solid fa-arrow-trend-up" class="mr-2"/>{{ resource.title }}</span>
                      <span class="col-span-1 justify-self-center text-gray-600 font-semibold italic">{{ resource.subject }}</span>
                      <span class="col-span-1 justify-self-center text-gray-600 font-thin italic">{{ resource.category }}</span>
                    </div>
                  </div>
                  <p v-else class="text-base text-center my-2">No related search results</p>
                </div>
              </div>

              <div class="my-3 mx-auto w-full">
                <p class="text-lg text-center text-black dark:text-gray-100 tracking-wider my-2 font-semibold">
                  <i>Not what you are looking for?</i>
                </p>
                <div class="flex justify-center items-center text-lg text-white w-fit mx-auto px-3 py-1
                bg-primary border-2 border-primary rounded-full shadow-lg transition duration-100 ease-in-out
                hover:text-primary hover:bg-white hover:scale-x-105">
                <router-link :to="{ name:'browse' }">
                  <span class="mr-8"><b>Go To Browse</b></span>
                  <font-awesome-icon icon="fa-arrow-right" />
                </router-link>
                </div>
              </div>
          </div>

          <!-- Bouncing down button -->
          <div class="absolute -bottom-6 left-0 right-0 text-center animate-bounce">
            <button @click="$emit('scrollNext')" class="w-12 h-12 rounded-full bg-primary 
            border-2 border-primary transition duration-150 ease-in-out text-white 
            hover:text-primary hover:bg-white hover:scale-105">
              <font-awesome-icon icon="fa-solid fa-down-long" class="mx-auto w-8 h-8 
              hover:scale-105" />
            </button>
          </div>

      </div>
    </div>

  <!-- Sticky search bar -->
  <Transition 
    enter-active-class="duration-200 ease-in-out"
    enter-from-class="-translate-y-full"
    leave-active-class="duration-100 ease-in-out"
    leave-to-class="-translate-y-full">
  <div v-if="stickySearch" class="fixed top-20 w-full mx-auto mt-1 mb-2 px-48 py-2 z-40 
  bg-gray-400 bg-opacity-30 shadow-xl dark:bg-opacity-50 transition duration-100 ease-in-out" id="bar">
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-2 text-slate-400 dark:text-gray-500" />
        </span>
        <input type="text" v-model="search" class="placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-500
        placeholder:text-base block bg-white dark:bg-gray-200 w-full rounded-full py-2 pl-11 pr-3 shadow-sm
        focus:outline-none" :class="{ 'rounded-b-none': search, 'rounded-t-2xl': search }"
        placeholder="Enter keywords..." />
      </label>

      <!-- Result dropdown -->
      <div v-if="search" class="absolute mx-48 inset-x-0 bg-white dark:bg-gray-200 rounded-b-2xl pb-2">
        <div v-if="resultHit" class="text-base">
          <div @click="show(resource)" v-for="resource in resources.slice(0, 6)" :key="resource.resourceId" 
          class="mx-1 my-1 py-1 pl-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 grid grid-cols-4">
            <span class="col-span-2"><font-awesome-icon icon="fa-solid fa-arrow-trend-up" class="mr-2"/>{{ resource.title }}</span>
            <span class="col-span-1 justify-self-center text-gray-600 font-semibold italic">{{ resource.subject }}</span>
            <span class="col-span-1 justify-self-center text-gray-600 font-thin italic">{{ resource.category }}</span>
          </div>
        </div>
        <p v-else class="text-base text-center my-2">No related search results</p>
      </div>
  </div>
  </Transition>

  <!-- Search result modal -->
  <Teleport to="body">
        <ModalVue :show="showModal" @close="showModal = false">
          <div class="w-full h-full">
            <div class="w-full h-2/5">
                <img :src="url + 'thumbnails/' + resource.thumbnail" alt="" class="w-full h-full 
                object-cover object-top">
            </div>
            <div class="text-2xl line-clamp-2 m-px"><b>{{ resource.title }}</b></div>
            <div class="text-lg mt-1 mb-2">
                <div class="text-justify leading-5 line-clamp-4"><b>Description: </b>{{ resource.description }}</div>
                <div class=""><b>ISBN/Identifier: </b>{{ resource.identifier }}</div>
                <div class=""><b>Date Added: </b>{{ resource.date }}</div>
                <div class=""><b>Author: </b>{{ resource.author }}</div>
                <div class="">
                    <b>URL: </b>
                    <a :href="resource.url" target="_blank" class="underline text-primary 
                    hover:text-tertiary dark:text-secondary dark:hover:text-tertiary">
                    {{ resource.url }}
                    </a>
                </div>
            </div>
            <div class="absolute bottom-2 right-2 flex justify-end items-center mt-3">
              <Transition 
                  enter-active-class="duration-300 ease-in-out"
                  enter-from-class="opacity-0 translate-x-8"
                  leave-active-class="duration-300 ease-in-out"
                  leave-to-class="opacity-0 translate-x-8">
                  <div v-if="modalError" class="rounded-lg border-4 border-red-600 bg-red-400
                  px-2 py-1 text-center text-white text-lg">
                      <b>{{ modalErrorMsg }}</b>
                  </div>
              </Transition>  
              <button @click="download(resource.resourceId, resource.title)" class="text-white flex justify-center items-center border-primary border-2 
                rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                hover:bg-white hover:scale-110">
                    <font-awesome-icon icon="fa-solid fa-download" class="h-5 w-5 mr-2"/>
                    <p>Download</p>
                </button >
                <button @click="bookmark(resource.resourceId)" class="text-white flex justify-center items-center border-primary border-2 
                rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                hover:bg-white hover:scale-110">
                    <font-awesome-icon icon="fa-solid fa-bookmark" class="h-5 w-5 mr-2"/>
                    <p>Add Bookmark</p>
                </button>
            </div>
          </div>
        </ModalVue>
  </Teleport>

</template>

<script>
import ModalVue from './Modal.vue'
import axios from 'axios'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'SearchVue',
    emits: ["scrollNext"],
    components: { ModalVue },
    setup(){
      const url = process.env.VUE_APP_DEV_URL
      const search = ref(null)
      const stickySearch = ref(false)
      const resultHit = ref(false)
      const resources = ref([])
      const resource = ref()
      const showModal = ref(false)
      const modalError = ref(false)
      const modalErrorMsg = ref()
      const store = useStore()
      const router = useRouter()

      watch(search, (keywords)=>{
        if(search.value){
          getSearch(keywords)
        }
      })

      // Async GET script to fetch search results
      const getSearch = async (keywords) => {
        await axios.get('search.php?keywords=' + keywords 
                        + '&userId=' + store.state.userId, {
          headers:{ 'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response)=>{
          resources.value = []
          if(response.data.resources.length > 0){
            const resource = response.data.resources
            for(const i in resource){
              resources.value.push(resource[i])
            }
            resultHit.value = true
          } else {
            resultHit.value = false
          }
        })
        .catch((error) => {
          if(error.response.status === 401) router.push('/login')
        })
      }

      const show = (selected) => {
        resource.value = selected
        showModal.value = true
      }

      // Async GET script to download resource
      const download = async (id, title) => {
            await axios.get('download.php?id='+ id + '&userId=' + store.state.userId, {
                responseType: 'blob'
            })
            .then((response) => {
              const isApp = response.headers.get('Content-Type')?.includes('application')
              if(isApp){
                const ext = response.headers.get('Content-Type').split("/").pop()
                const href = window.URL.createObjectURL(response.data)
                const link = document.createElement('a')
                link.href = href
                link.target = '_blank'
                link.setAttribute('download', title + '.' + ext)
                document.body.appendChild(link)
                link.click()

                document.body.removeChild(link)
                URL.revokeObjectURL(href)
              } else {
                const reader = new FileReader()
                reader.onload = () => {
                    const result = JSON.parse(reader.result)
                    modalError.value = result.error
                    modalErrorMsg.value = result.msg
                }
                reader.readAsText(response.data)
                setTimeout(() => {
                    modalError.value = !modalError.value
                }, 5000)
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

        // Async POST script to add bookmark
        const bookmark = async (id) => {
            const data = {
                'action': 'add',
                'userId': store.state.userId,
                'resourceId': id
            }
            await axios.post('/bookmark.php', data, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                if(response.data.error === true){
                    modalError.value = true
                    modalErrorMsg.value = response.data.errorMsg
                    setTimeout(() => {
                        modalError.value =  !modalError.value
                    }, 5000)
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

      return { url, search, stickySearch, resultHit, getSearch, resources, resource, showModal, show, download, bookmark, modalError, modalErrorMsg }
    },
    mounted(){
      const sBar = document.querySelector("#searchBar")

      const options1 = {
        root: null,
        rootMargin: '-80px 0px 0px 0px',
        threshold: [1]
      }

      const observer1 = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting){
            this.stickySearch = false
            
        } else {
            this.stickySearch = true
        }
      }, options1)

      setTimeout(() => {
        observer1.observe(sBar)
      }, 900);     
  }
}
</script>

<style>
.gif-bg{
  background: url('https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/020-B2S-Blog_2-Families-SL-v2.gif');
  background-size: cover;
  box-shadow: inset 0 0 0 100vw rgba(0, 0, 0, 0.2);
}
</style>
