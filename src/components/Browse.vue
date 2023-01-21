<template>    
    <!-- Selection tabs -->
    <ul data-tabs class="w-full grid grid-cols-3 gap-x-4 text-center">
        <li data-tab=1 data-tab-name="subject" data-active="none" @click=switchTab($event.currentTarget.dataset.tab) class="py-3 flex justify-center items-center text-gray-400
        border-primary bg-gray-200 cursor-pointer rounded-t-xl transition duration-100 ease-in-out
        data-[active=active]:text-primary data-[active=active]:border-b-4 hover:text-tertiary
        hover:-translate-y-2 hover:shadow-md group dark:bg-gray-500 dark:text-gray-200 
        dark:data-[active=active]:text-primary dark:hover:text-tertiary">
            <p class="font-semibold transition ease-in-out duration-100 group-hover:scale-100">Browse By Subject</p>
            <font-awesome-icon icon="fa-solid fa-book-open" class="ml-3 h-8 transition ease-in-out duration-100" />
        </li>
        <li data-tab=2 data-tab-name="category" data-active="none" @click=switchTab($event.currentTarget.dataset.tab) class="py-3 flex justify-center items-center text-gray-400
        border-primary bg-gray-200 cursor-pointer rounded-t-xl transition duration-100 ease-in-out
        data-[active=active]:text-primary data-[active=active]:border-b-4 hover:text-tertiary
        hover:-translate-y-2 hover:shadow-md group dark:bg-gray-500 dark:text-gray-200 
        dark:data-[active=active]:text-primary dark:hover:text-tertiary">
            <p class="font-semibold transition ease-in-out duration-100">Browse By Category</p>
            <font-awesome-icon icon="fa-solid fa-layer-group" class="ml-3 h-8 transition ease-in-out duration-100" />
        </li>
    </ul>

    <Transition mode="out-in"
        enter-active-class="delay-200 duration-300 ease-in-out"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="duration-300 ease-in-out"
        leave-to-class="opacity-0 translate-y-2">
    <!-- Subject buttons -->
    <div v-if="currentTab == 1" class="mt-3 p-2 grid grid-cols-4 gap-x-2 gap-y-4 justify-items-center items-center">
        <div @click="select(subject.id)" v-for="subject in subjects" :key="subject.id" :data-subject-id="subject.id" class="w-48 h-48
        bg-white rounded-xl shadow-md border-primary border-0 flex flex-col justify-center items-center
        transition duration-100 ease-in-out hover:shadow-lg hover:scale-105 hover:border-2
        hover:text-primary group dark:bg-gray-700 dark:hover:bg-gray-400 
        dark:hover:border-gray-200 dark:hover:text-primary" :class="subject.colour">
            <div class="mb-3">
                <font-awesome-icon :icon="subject.icon" class="w-12 h-12"/>
            </div>
            <div class="text-2xl text-center uppercase font-bold tracking-widest">
                {{ subject.name }}
            </div>
        </div>
    </div>

    <div v-else-if="currentTab == 2" class="mt-3 p-2 grid grid-cols-3 justify-items-center items-center">
        <div @click="select(category.id)" v-for="category in categories" :key="category.id" :data-category-id="category.id" class="h-56 w-56
        bg-white rounded-xl shadow-md border-primary border-0 flex flex-col justify-center items-center
        transition duration-100 ease-in-out hover:shadow-lg hover:scale-105 hover:border-2
        hover:text-primary dark:bg-gray-700 dark:hover:bg-gray-400 
        dark:hover:border-gray-200 dark:hover:text-primary" :class="category.colour">
            <div class="mb-3">
                <font-awesome-icon :icon="category.icon" class="w-12 h-12"/>
            </div>
            <div class="text-2xl text-center uppercase font-bold tracking-widest">
                {{ category.name }}
            </div>
        </div>
    </div>
    </Transition>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'BrowseVue',
    emits: [ 'showResult' ],
    setup(props, context){
        const router = useRouter()
        const route = useRoute()
        const currentTab = ref()
        const currentTabName = ref()

        watch(route, (newParam)=>{
            if(newParam.params.option === 'category'){
                switchTab(2)
            } else {
                switchTab(1)
            }
        })

        // Switch between different tabs function
        const switchTab = (e) => {
            const newTab = ref(e)
            const tabs = ref(document.querySelector('[data-tabs]'))
            const activeTab = ref(document.querySelector('[data-active="active"]'))
            
            activeTab.value.dataset.active = 'none'
            tabs.value.children[newTab.value - 1].dataset.active = 'active'
            currentTab.value = newTab.value

            if(currentTab.value == 1) currentTabName.value = 'subject'
            if(currentTab.value == 2) currentTabName.value = 'category'

            router.push({name: 'browse', params: { option: currentTabName.value}})
        }

        // Emit option & selection button id
        const select = (id) => {
            if(currentTab.value == 1) currentTabName.value = 'subject'
            if(currentTab.value == 2) currentTabName.value = 'category'
            context.emit('showResult', currentTabName.value, id)
        }

        // Subjects object data
        const subjects = ref([
            {
                id: 1,
                name: 'Language Studies',
                icon: 'fa-solid fa-language',
                colour: 'text-blue-400'
            },
            {
                id: 2,
                name: 'Maths',
                icon: 'fa-solid fa-superscript',
                colour: 'text-violet-500'
            },
            {
                id: 3,
                name: 'Biology',
                icon: 'fa-solid fa-seedling',
                colour: 'text-green-500'
            },
            {
                id: 4,
                name: 'Physics',
                icon: 'fa-solid fa-atom',
                colour: 'text-pink-400'
            },
            {
                id: 5,
                name: 'Chemistry',
                icon: 'fa-solid fa-flask',
                colour: 'text-orange-500'
            },
            {
                id: 6,
                name: 'Economy',
                icon: 'fa-solid fa-comments-dollar',
                colour: 'text-zinc-400'
            },
            {
                id: 7,
                name: 'Accounting',
                icon: 'fa-solid fa-calculator',
                colour: 'text-cyan-600'
            },
            {
                id: 8,
                name: 'History',
                icon: 'fa-solid fa-landmark',
                colour: 'text-yellow-500'
            },
        ])

        // Categories object data
        const categories = ref([
            {
                id: 1,
                name: 'E-Books',
                icon: 'fa-solid fa-book',
                colour: 'text-red-500'
            },
            {
                id: 2,
                name: 'Videos',
                icon: 'fa-solid fa-tv',
                colour: 'text-gray-400'
            },
            {
                id: 3,
                name: 'Past Papers',
                icon: 'fa-solid fa-scroll',
                colour: 'text-emerald-400'
            }
        ])

        return { currentTab, currentTabName, switchTab, select, subjects, categories }
    },
    mounted(){
        const route = useRoute()
        if(route.params.option){
            const tab = ref(document.querySelector('[data-tab-name="' + route.params.option + '"]'))
            tab.value.dataset.active = 'active'
            this.currentTab = tab.value.dataset.tab
        } else {
            const tab = ref(document.querySelector('[data-tab="1"]'))
            tab.value.dataset.active = 'active'
            this.currentTab = 1
        }
    }
}
</script>