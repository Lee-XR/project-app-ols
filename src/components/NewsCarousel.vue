<template>
    <div class="my-20 py-1">
        <div class="border-primary"></div>
        <!-- Carousel section title -->
        <div class="mx-20 pb-3 border-b-4 border-black dark:text-gray-200 dark:border-gray-200">
            <h1 class="text-5xl tracking-wide"><b>LATEST NEWS</b></h1>
        </div>

        <!-- Carousel content -->
        <div class="mx-20 my-5">
            <div class="w-full h-[35rem] relative overflow-hidden">

                <!-- Next & Previous buttons -->
                <button data-news-carousel-btn="prev" @click="slideTo($event)" class="absolute z-10 bg-gray-100 opacity-40 border-primary rounded-full shadow-lg transition 
                duration-100 ease-in-out hover:opacity-100 hover:shadow-xl hover:scale-105 hover:border-2 h-24 left-5 inset-y-0 
                my-auto focus-visible:outline-none focus-visible:opacity-100 focus-visible:shadow-xl focus-visible:scale-105 focus-visible:border-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-compact-left text-gray-500 h-24 hover:text-primary drop-shadow-lg transition duration-50 ease-in-out" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                    </svg>
                </button>
                <button data-news-carousel-btn="next" @click="slideTo($event)" class="absolute z-10 bg-gray-100 opacity-40 border-primary rounded-full shadow-lg transition 
                duration-100 ease-in-out hover:opacity-100 hover:shadow-xl hover:scale-105 hover:border-2 h-24 right-5 inset-y-0 
                my-auto focus-visible:outline-none focus-visible:opacity-100 focus-visible:shadow-xl focus-visible:scale-105 focus-visible:border-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-compact-right h-24 hover:text-primary drop-shadow-lg transition duration-50 ease-in-out" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                    </svg>
                </button>

                <!-- Slides buttons -->
                <ul data-news-btns class="absolute inset-x-0 bottom-8 mx-auto p-1 z-10 w-fit flex justify-evenly">
                    <li v-for="index in 4" :key="index" :data-news-btn="index" :data-news-active="index === 1 ? 'active' : 'none'" @click="goTo($event)" class="h-2 w-16 mx-2 rounded-full bg-gray-100 opacity-40 shadow-xl transition duration-100 delay-150 ease-in-out 
                    hover:opacity-100 data-[news-active=active]:opacity-100 data-[news-active=active]:bg-primary data-[news-active=active]:-translate-y-1">
                    </li>
                </ul>

                <!-- Carousel slides -->
                <ul data-news-slides class="m-0 p-0 list-none group">
                    <li v-for="slide in articles.slice(0,4)" :key="slide.id" 
                    :data-news-slide="slide.id" 
                    :data-news-show="slide.id === 1 ? 'active' : 'none'" class="absolute inset-0
                    transition duration-700 delay-200 ease-in-out data-[news-show=none]:opacity-0">
                        <img :src="slide.image" :alt="'Article ' + slide.id" referrerpolicy="no-referrer" class="w-full h-full 
                        object-cover transition duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-110 
                        dark:brightness-90">
                        <!-- Article Text Container -->
                        <div class="absolute top-0 bottom-0 right-36 my-auto px-3 py-2 w-2/5 h-fit flex flex-col justify-center
                        text-gray-600 bg-gray-700 bg-opacity-0 opacity-40 group-hover:opacity-100 group-hover:bg-opacity-50
                        group-hover:text-gray-200 group-hover:shadow-xl transition duration-300 ease-in-out
                        group-hover:delay-100 scale-95 group-hover:scale-105">
                            <h2 class="text-3xl tracking-wide mb-2"><b>{{ slide.title }}</b></h2>
                            <p class="text-lg italic line-clamp-3 text-justify">
                                {{ slide.description }}
                            </p>
                            <p class="group-hover:text-secondary mt-1 underline text-center text-lg tracking-widest">
                                <a :href="slide.link" target="_blank" class="hover:text-tertiary">Read more</a>
                            </p>                                
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-link to="/browse">
            <button class="flex justify-center items-center text-lg text-white w-1/6 mx-auto px-3 py-1
            bg-primary border-2 border-primary rounded-full shadow-lg transition duration-100 ease-in-out
            hover:text-primary hover:bg-white hover:scale-x-105">
                <span class="mr-8"><b>More</b></span>
                <font-awesome-icon icon="fa-arrow-right"/>
            </button>
         </router-link>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
    name: 'NewsCarouselVue',
    setup(){
        const articles = ref([])

        onMounted(() => {
            getNews()
        })

        const update = (btns, activeBtn, slides, activeSlide, nextSlideIndex) => {
            btns.children[nextSlideIndex].dataset.newsActive = 'active'
            activeBtn.dataset.newsActive = 'none'
            slides.children[nextSlideIndex].dataset.newsShow = 'active'
            activeSlide.dataset.newsShow = 'none'
            slides.children[nextSlideIndex].classList.remove('collapse')
            setTimeout(() => {
                for(let slide of slides.children){
                    if(slide.dataset.newsShow === 'none'){
                        slide.classList.add('collapse')
                    }
                }
            }, 500)
        }

        const slideTo =  (e) => {
            const action = e.currentTarget.dataset.newsCarouselBtn
            const offset = ref()

            if(action === 'next'){
                offset.value = 1
            } else {
                offset.value = -1
            }

            const btns = ref(document.querySelector('[data-news-btns]'))
            const activeBtn = ref(document.querySelector('[data-news-active="active"]'))
            const slides = ref(document.querySelector('[data-news-slides]'))
            const activeSlide = ref(document.querySelector('[data-news-show="active"]'))
            const nextSlideIndex = ref([...slides.value.children].indexOf(activeSlide.value) + offset.value)

            if(nextSlideIndex.value < 0) nextSlideIndex.value = slides.value.children.length - 1
            if(nextSlideIndex.value >= slides.value.children.length) nextSlideIndex.value = 0
            update(btns.value, activeBtn.value, slides.value, activeSlide.value, nextSlideIndex.value)
        }

        const goTo = (e) => {
            const n = ref(e.target.dataset.newsBtn)
            const btns = ref(document.querySelector(['[data-news-btns]']))
            const activeBtn = ref(document.querySelector('[data-news-active="active"]'))
            const slides = ref(document.querySelector('[data-news-slides]'))
            const activeSlide = ref(document.querySelector('[data-news-show="active"]'))

            if(n.value != activeBtn.value.dataset.newsBtn){
                update(btns.value, activeBtn.value, slides.value, activeSlide.value, n.value-1)
            }
        }

        // New Axios instance config to fetch RSS data
        const getNewsInstance = axios.create({
            baseURL: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.malaymail.com%2Ffeed%2Frss%2Fmalaysia',
            withCredentials: false,
        })

        const getNews = async () => {
            await getNewsInstance.get('')
            .then((response) => {
                const items = response.data.items
                for (const i in items){
                    const obj = {
                        id: parseInt(i) + 1, 
                        title: items[i].title, 
                        description: items[i].description, 
                        image: items[i].content.match(/\bhttps?:\/\/\S+/gi)[0].replace("\"", ''), 
                        link: items[i].link
                    }
                    if(obj.image === null || obj.image === '') obj.image = 'http://localhost:80/scripts/thumbnails/default.png'
                    articles.value.push(obj)
                }
            })
        }
        
        return { slideTo, goTo, getNews, articles }
    }
}
</script>