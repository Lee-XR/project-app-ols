<template>
  <!-- Selection tabs -->
  <ul data-tabs class="w-full grid grid-cols-3 gap-x-4 text-center">
        <li v-for="tab in tabs" :key="tab.id" :data-tab="tab.id" :data-tab-name="tab.name.toLowerCase()" data-active="none"
        @click="switchTab($event.currentTarget.dataset.tab)"
        class="py-3 flex justify-center items-center text-gray-400 border-primary bg-gray-200 cursor-pointer
        rounded-t-xl data-[active=active]:text-primary data-[active=active]:border-b-4 hover:text-tertiary
        hover:-translate-y-2 hover:shadow-md group dark:bg-gray-500 dark:text-gray-200 dark:data-[active=active]:text-primary 
        dark:hover:text-tertiary">
            <p class="font-semibold text-2xl transition ease-in-out duration-100 group-hover:-translate-y-1">
                {{ tab.name }}
            </p>
            <font-awesome-icon :icon="tab.icon" class="ml-3 h-8 transition ease-in-out duration-100 group-hover:-translate-y-1" />
        </li>
    </ul>
    <Transition appear mode="out-in"
        enter-active-class="duration-500 ease-in-out"
        enter-from-class="opacity-0 scale-110"
        leave-active-class="duration-500 ease-in-out"
        leave-to-class="opacity-0 scale-110">
        <div class="mt-3 mx-3 text-xl text-center dark:text-gray-200">
            <font-awesome-icon v-if="connError === false && hits === null" icon="fa-solid fa-spinner" class="animate-spin h-14 w-14 text-primary"/>
            <div v-else-if="connError === true && hits === null" class="text-red-500">
                <p class="text-3xl"><b>Oops! An error has occured...</b></p>
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="h-16 w-16 mt-3" />
            </div>
            <p v-else><b>{{ hits }}</b> bookmark(s) added.</p>
        </div>
    </Transition>

    <!-- Result display -->
    <div v-if="hits > 0" class="p-2 grid grid-cols-1 gap-y-2 items-center">
        <TransitionGroup appear tag="ul"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave">
            <li @click="show(resource)" v-for="(resource, index) in resources" :key="resource.resourceId" :data-index="index">
                <div class="bg-gray-50 rounded-lg w-full h-44 mb-2 p-2 shadow-md
                border-primary border-0 flex justify-start items-center transition duration-300 ease-in-out
                hover:shadow-lg hover:border-2 hover:scale-105 hover:cursor-default dark:text-gray-200
                dark:bg-gray-700 dark:hover:bg-gray-400 dark:hover:border-gray-200">
                    <div class="w-1/3 h-full mr-2 drop-shadow-md">
                        <img :src="require('@/assets/thumbnails/' + resource.thumbnail)" alt="image" class="w-full h-full object-cover object-top dark:brightness-90">
                    </div>
                    <div class="w-2/3 h-full px-1 grid grid-cols-2 gap-x-3 items-center">
                        <div class="col-start-1 col-end-3 text-xl truncate">
                            <b>{{ resource.title }}</b>
                        </div>
                        <div class="col-span-2">
                            <p class="line-clamp-2"><b>Description: </b>{{ resource.description }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="line-clamp-1"><b>ISBN / Identifier: </b>{{ resource.identifier }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="line-clamp-1"><b>Date Added: </b>{{ resource.date }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="line-clamp-1"><b>Author: </b>{{ resource.author }}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="truncate"><b>URL: </b>{{ resource.url }}</p>
                        </div>
                    </div>
                </div>
            </li>
        </TransitionGroup>
    </div>

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
                    <button @click="download(resource.resourceId, resource.title)" class="text-white flex justify-center items-center border-primary border-2 
                    rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                    hover:bg-white hover:scale-110">
                        <font-awesome-icon icon="fa-solid fa-download" class="h-5 w-5 mr-2"/>
                        <p>Download</p>
                    </button >
                    <button @click="bookmark(resource.bookmarkId)" class="text-white flex justify-center items-center border-primary border-2 
                    rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                    hover:bg-white hover:scale-110">
                        <font-awesome-icon icon="fa-solid fa-bookmark" class="h-5 w-5 mr-2"/>
                        <p>Remove Bookmark</p>
                    </button>
                </div>
            </div>
        </ModalVue>
    </Teleport>
</template>

<script>
import ModalVue from './Modal.vue';
import axios from 'axios';
import { ref, watch } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import gsap from 'gsap';

export default {
    name: 'BookmarkVue',
    components: { ModalVue },
    setup(){
        const showModal = ref(false)
        const resources = ref([])
        const currentTab = ref(1)
        const resource = ref()
        const hits = ref(null)
        const connError = ref(false)
        const modalError = ref(false)
        const modalErrorMsg = ref()
        const store = useStore()
        const router = useRouter()

        const show = (selected) => {
            showModal.value = true
            resource.value = selected
        }

        watch(hits, (newValue)=>{
            hits.value = newValue
        })

        // Switch between different tabs function
        const switchTab = (e) => {
            const newTab = ref(e)
            const tabs = ref(document.querySelector('[data-tabs]'))
            const activeTab = ref(document.querySelector('[data-active="active"]'))

            activeTab.value.dataset.active = 'none'
            tabs.value.children[newTab.value - 1].dataset.active = 'active'
            currentTab.value = newTab.value
            hits.value = null
            getBookmarks(currentTab.value)
        }

        // Tabs object data
        const tabs = ref([
            {
                id: 1,
                name: 'E-Books',
                icon: 'fa-solid fa-book'
            },
            {
                id: 2,
                name: 'Videos',
                icon: 'fa-solid fa-tv',
            },
            {
                id: 3,
                name: 'Past Papers',
                icon: 'fa-solid fa-scroll',
            }
        ])

        // Async POST script to get bookmarks
        const getBookmarks = async (category) => {
            const data = {
                'userId': store.state.userId,
                'category': category
            }
            connError.value = false
            await axios.post('http://localhost:80/scripts/getBookmarks.php', data, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response)=>{
                if(response.data){
                    resources.value = []
                    const resource = response.data.resources
                    for(const i in resource){
                        resources.value.push(resource[i])
                    }
                    hits.value = response.data.hits
                }
            })
            .catch((error)=>{
                if(error.response.status === 401){
                    router.push('/login')
                }
                connError.value = true
                hits.value = null
            })
        }

         // Async GET script to download resource
         const download = async (id, title) => {
            await axios.get('http://localhost:80/scripts/download.php?id='+ id + '&userId=' + store.state.userId, {
                withCredentials: true,
                responseType: 'blob',
            })
            .then((response) => {
                const isApp = response.headers.get('Content-Type')?.includes('application')
                if(isApp){
                    const href = window.URL.createObjectURL(response.data)
                    const link = document.createElement('a')
                    link.href = href
                    link.setAttribute('download', title)
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

        // Async POST script to remove bookmark
        const bookmark = async (id) => {
            const data = {
                'action': 'remove',
                'userId': store.state.userId,
                'bookmarkId': id
            }
            await axios.post('http://localhost:80/scripts/bookmark.php', data, {
                withCredentials: true,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                if(response.data.error === true){
                    modalError.value = !modalError.value
                    modalErrorMsg.value = response.data.errorMsg
                    setTimeout(() => {
                        modalError.value = !modalError.value
                    }, 5000)
                } else {
                    getBookmarks(currentTab.value)
                    showModal.value = !showModal.value
                }
            })
            .catch((error) => {
                modalError.value = !modalError.value
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

        const onBeforeEnter = (el) => {
            el.style.opacity = 0
            el.style.transform = 'translateY(-20px)'
        }

        const onEnter = (el, done) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.inOut",
                delay: el.dataset.index * 0.1,
                onComplete: done
            })
        }

        const onLeave = (el) => {
            el.style.opacity = 0
            el.style.transform = 'translateY(-20px)'
        }

        return { showModal, resources, show, switchTab, tabs, hits, getBookmarks, 
                connError, resource, download, bookmark, modalError, modalErrorMsg, 
                onBeforeEnter, onEnter, onLeave }
    },
    mounted(){
        const tabs = ref(document.querySelector('[data-tabs]'))
        tabs.value.children[0].dataset.active = 'active'
        this.currentTab = 1
        this.getBookmarks(this.currentTab)
    }
}
</script>

<style>

</style>