<template>
  <div class="my-20 py-1">
    <!-- Useful Resources section title -->
    <div class="mx-20 pb-3 border-b-4 border-black dark:text-gray-200 dark:border-gray-200">
        <h1 class="text-5xl tracking-wide"><b>USEFUL RESOURCES</b></h1>
    </div>
    <!-- Grid content -->
    <div class="mx-20 my-5">
        <div class="grid grid-cols-3 gap-x-4 gap-y-8">
            <div @click="show(resource)" v-for="resource in resources" :key="resource.id" 
            class="bg-gray-200 h-96 p-2 shadow-lg rounded-lg cursor-pointer 
            border-primary transition duration-200 ease-in-out hover:scale-105 
            hover:shadow-2xl hover:border-2 hover:bg-white dark:bg-gray-500 
            dark:hover:bg-gray-400 dark:border-gray-200">
                <div class="h-2/3 drop-shadow-lg">
                    <img :src="require('@/assets/thumbnails/' + resource.thumbnail)" alt="image" class="h-full w-full object-cover object-top dark:brightness-90">
                </div>
                <div class="h-1/3 mt-1 p-2 flex flex-col justify-center">
                    <h2 class="text-2xl w-full leading-tight text-center font-semibold dark:text-gray-200">
                        {{ resource.title }}
                    </h2>
                </div>
            </div>
        </div>
    </div>
  </div>

  <Teleport to="body">
        <ModalVue :show="showModal" @click="showModal = false">
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
                        <a :href="resource.url" target="_blank" class="underline text-primary hover:text-tertiary dark:text-secondary dark:hover:text-tertiary">
                            {{ resource.url }}
                        </a>
                    </div>
                </div>
                <div class="absolute bottom-2 right-2 flex justify-end items-end mt-3">
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
                    <button @click="download(resource.id, resource.title)" class="text-white flex justify-center items-center border-primary border-2 
                    rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                    hover:bg-white hover:scale-110">
                        <font-awesome-icon icon="fa-solid fa-download" class="h-5 w-5 mr-2"/>
                        <p>Download</p>
                    </button >
                    <button @click="bookmark(resource.id)" class="text-white flex justify-center items-center border-primary border-2 
                    rounded-full px-2 py-1 ml-5 bg-primary transition duration-200 ease-in-out hover:text-primary 
                    hover:bg-white hover:scale-110">
                        <font-awesome-icon icon="fa-solid fa-bookmark" class="h-5 w-5 mr-2"/>
                        <p>Bookmark</p>
                    </button>
                </div>
            </div>
        </ModalVue>
    </Teleport>
</template>

<script>
import ModalVue from './Modal.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'UsefulResourcesVue',
    components: { ModalVue },
    setup(){
        const showModal = ref(false)
        const resource = ref()
        const modalError = ref(false)
        const modalErrorMsg = ref()
        const store = useStore()

        // Show individual resource details
        const show = (selected) => {
            showModal.value = true
            resource.value = selected
        }

        // Async GET script to download resource
        const download = async (id, title) => {
            await axios.get('http://localhost:80/scripts/download.php?id='+ id, {
                withCredentials: true,
                responseType: 'blob'
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
                    modalErrorMsg.value = 'Error: ' + error.response.status + ' ' + error.response.data
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
            await axios.post('http://localhost:80/scripts/bookmark.php', data, {
                withCredentials: true
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
                    modalErrorMsg.value = 'Error: ' + error.response.status + ' ' + error.response.data
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

        const resources = ref([
            {
                id: 16,
                title: 'What is Inflation?',
                description: 'Economists constantly refer to inflation and tend to suggest it is a Very Bad Thing. But why exactly,  where does it come from and what could one do to tame it?',
                thumbnail: 'resource_16.jpg',
                url: 'https://www.youtube.com/watch?v=UMAELCrJxt0',
                date: '2015-08-03',
                author: 'The School of Life',
                identifier: 'UMAELCrJxt0',
                download: 'default.mp4'
            },
            {
                id: 28,
                title: 'Destiny Disrupted: A History of the World Through Islamic Eyes',
                description: 'N/A',
                thumbnail: 'resource_28.jpg',
                url: 'https://www.pdfdrive.com/destiny-disrupted-a-history-of-the-world-through-islamic-eyes-e60375009.html',
                date: '2011-01-01',
                author: 'Tamim Ansary',
                identifier: '978-1-58648-813-0',
                download: 'resource_28.pdf'
            },
            {
                id: 31,
                title: 'A Student\'s Introduction to English Grammar',
                description: 'This book is intended for students in colleges or universities who have little or no previous background in grammar, and presupposes no linguistics. It contains exercises and a wealth of other features, and will provide a basis for introductions to grammar and courses on the structure of English not only in linguistics departments but also in English language and literature departments and schools of education. Students will achieve an accurate understanding of grammar that will both enhance the',
                thumbnail: 'resource_31.jpg',
                url: 'https://www.pdfdrive.com/a-students-introduction-to-english-grammar-e17324455.html',
                date: '2010-01-01',
                author: 'Rodney Huddleston, Geoffrey K. Pullum',
                identifier: '978-0-521-84837-4',
                download: 'resource_31.pdf'
            },
            {
                id: 35,
                title: 'Encyclopedia of Biology',
                description: 'N/A',
                thumbnail: 'resource_35.jpg',
                url: 'https://www.pdfdrive.com/encyclopedia-of-biology-e228531.html',
                date: '2008-01-01',
                author: 'Don Rittner, Timothy L. McCabe',
                identifier: '0-8160-4859-2',
                download: 'resource_35.pdf'
            },
            {
                id: 41,
                title: '2018 SPM Additional Mathematics Kertas 2',
                description: 'N/A',
                thumbnail: 'default.png',
                url: 'https://trial.spmpaper.me/?dir=SPM%20Sebenar%2FMatematik%20Tambahan%20%28Add%20Maths%29',
                date: '2018-01-01',
                author: 'Kementerian Pendidikan Malaysia',
                identifier: 'N/A',
                download: 'resource_41.pdf'
            },
            {
                id: 42,
                title: '2015 SPM Prinsip Perakaunan Kertas 1 + Kertas 2',
                description: 'N/A',
                thumbnail: 'default.png',
                url: 'https://trial.spmpaper.me/?dir=SPM%20Sebenar%2FPrinsip%20Perakaunan',
                date: '2015-01-01',
                author: 'Kementerian Pendidikan Malaysia',
                identifier: 'N/A',
                download: 'resource_42.pdf'
            }
        ])

        return { showModal, show, resource, resources, download, bookmark, modalError, modalErrorMsg }
    }
}
</script>
