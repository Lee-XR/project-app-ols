<template>
  <Transition appear
        enter-active-class="delay-200 duration-500 ease-in-out"
        enter-from-class="-translate-y-full">
    <div class="sticky top-20 bg-gray-400 bg-opacity-30 w-full mx-auto px-48 pt-3 pb-2 mb-2 shadow-xl z-40">
        <label class="relative block">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-2 text-slate-400 dark:text-gray-500" />
            </span>
            <input type="text" v-model="search" class="placeholder:italic placeholder:text-slate-400
            placeholder:text-base block bg-white dark:bg-gray-200 w-full rounded-full py-2 pl-11 pr-3 shadow-sm
            focus:outline-none" :class="{ 'rounded-b-none': search, 'rounded-t-2xl': search }"
            placeholder="Enter keywords..." />
        </label>
        <div v-if="search" class="absolute mx-48 inset-x-0 drop-shadow-lg bg-white dark:bg-gray-200 rounded-b-2xl pb-2">
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

    <Teleport to="body">
        <ModalVue :show="showModal" @close="showModal = false">
          <div class="w-full h-full">
            <div class="w-full h-2/5">
                <img :src="require('@/assets/thumbnails/' + resource.thumbnail)" alt="" class="w-full h-full 
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
              <button @click="download(resource.resourceId)" class="text-white flex justify-center items-center border-primary border-2 
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
    name: 'searchBarVue',
    components: { ModalVue },
    setup(){
        const search = ref()
        const resultHit = ref(false)
        const resources = ref([])
        const resource = ref()
        const showModal = ref(false)
        const modalError = ref(false)
        const modalErrorMsg = ref()
        const store = useStore()
        const router = useRouter()

watch(search, (keywords) => {
    if(search.value){
    getSearch(keywords)
    }
})

const getSearch = async (keywords) => {
    await axios.get('search.php?keywords=' + keywords + '&userId=' + store.state.userId, {
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((response) => {
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
    }).catch((error) => {
        if(error.response.status === 401){
            router.push('/login')
        }
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
            await axios.post('bookmark.php', data, {
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then((response) => {
                if(response.data.error){
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

        return { search, resultHit, resources, resource, showModal, show, download, bookmark, modalError, modalErrorMsg }
    },
}
</script>