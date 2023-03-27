<template>
    <div class="my-20 py-1">
        <!-- Carousel section title -->
        <div class="mx-20 pb-3 border-b-4 border-black dark:text-gray-200 dark:border-gray-200">
            <h1 class="text-5xl tracking-wide"><b>FEATURED VIDEOS</b></h1>
        </div>
        <!-- Carousel content -->
        <div class="mx-20 my-5">
            <div class="w-full h-[35rem] relative overflow-hidden">

                <!-- Next & Previous buttons -->
                <button data-video-carousel-btn="prev" @click="slideTo($event)" class="absolute z-10 bg-gray-100 opacity-40 border-primary rounded-full shadow-lg transition 
                duration-100 ease-in-out hover:opacity-100 hover:shadow-xl hover:scale-105 hover:border-2 h-24 left-5 inset-y-0 
                my-auto focus-visible:outline-none focus-visible:opacity-100 focus-visible:shadow-xl focus-visible:scale-105 focus-visible:border-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-compact-left text-gray-500 h-24 hover:text-primary drop-shadow-lg transition duration-50 ease-in-out" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                    </svg>
                </button>
                <button data-video-carousel-btn="next" @click="slideTo($event)" class="absolute z-10 bg-gray-100 opacity-40 border-primary rounded-full shadow-lg transition 
                duration-100 ease-in-out hover:opacity-100 hover:shadow-xl hover:scale-105 hover:border-2 h-24 right-5 inset-y-0 
                my-auto focus-visible:outline-none focus-visible:opacity-100 focus-visible:shadow-xl focus-visible:scale-105 focus-visible:border-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-compact-right text-gray-500 h-24 hover:text-primary drop-shadow-lg transition duration-50 ease-in-out" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                    </svg>
                </button>

                <!-- Slides buttons -->
                <ul data-video-btns class="absolute inset-x-0 bottom-8 mx-auto p-1 z-10 w-fit flex justify-evenly">
                    <li v-for="index in 4" :key="index" :data-video-btn="index" data-video-active="none" @click="goTo($event)" class="h-2 w-16 mx-2 rounded-full bg-gray-100 opacity-40 shadow-xl transition duration-100 delay-150 ease-in-out 
                    hover:opacity-100 data-[video-active=active]:opacity-100 data-[video-active=active]:bg-primary data-[video-active=active]:-translate-y-1">
                    </li>
                </ul>

                <!-- Carousel slides -->
                <ul data-video-slides class="m-0 p-0 list-none group">
                    <li v-for="slide in videosSlides" :key="slide.id" :data-video-slide="slide.id" 
                    :data-video-show="slide.id === 1 ? 'active' : 'none'" class="absolute inset-0 
                    transition duration-700 ease-in-out delay-200 data-[video-show=none]:opacity-0">
                        <img :src="require('@/assets/thumbnails/' + slide.image)" alt="" class="w-full h-full object-cover transition duration-300 ease-in-out group-hover:brightness-75 group-hover:scale-110 dark:brightness-90">
                        <div class="absolute top-0 bottom-0 right-36 my-auto px-3 py-2 w-2/5 h-fit flex flex-col justify-center
                        text-gray-600 bg-gray-700 bg-opacity-0 opacity-40 group-hover:opacity-100 group-hover:bg-opacity-50
                        group-hover:text-gray-200 group-hover:shadow-xl transition duration-300 ease-in-out
                        group-hover:delay-100 scale-95 group-hover:scale-105">
                            <h2 class="text-3xl tracking-wide mb-2"><b>{{ slide.title }}</b></h2>
                            <p class="text-lg italic line-clamp-4 text-justify">
                                {{ slide.description }}
                            </p>
                            <p class="group-hover:text-secondary mt-1 underline text-center tracking-widest">
                                <a :href="slide.link" target="_blank" class="hover:text-tertiary">Watch Now</a>
                            </p>                                
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-link to="/browse">
            <div class="flex justify-center items-center text-lg text-white w-1/6 mx-auto px-3 py-1
            bg-primary border-2 border-primary rounded-full shadow-lg transition duration-100 ease-in-out
            hover:text-primary hover:bg-white hover:scale-x-105">
                <span class="mr-8"><b>More</b></span>
                <font-awesome-icon icon="fa-arrow-right"/>
            </div>
         </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'VideoCarouselVue',
    setup(){

        const update = (btns, activeBtn, slides, activeSlide, nextSlideIndex) => {
            btns.children[nextSlideIndex].dataset.videoActive = 'active'
            activeBtn.dataset.videoActive = 'none'
            slides.children[nextSlideIndex].dataset.videoShow = 'active'
            activeSlide.dataset.videoShow = 'none'
            slides.children[nextSlideIndex].classList.remove('collapse')
            setTimeout(() => {
                for(let slide of slides.children){
                    if(slide.dataset.videoShow === 'none'){
                        slide.classList.add('collapse')
                    }
                }
            }, 500)
        }

        const slideTo =  (e) => {
            const action = e.currentTarget.dataset.videoCarouselBtn
            const offset = ref()

            if(action === 'next'){
                offset.value = 1
            } else {
                offset.value = -1
            }

            const btns = ref(document.querySelector(['[data-video-btns]']))
            const activeBtn = ref(document.querySelector('[data-video-active="active"]'))
            const slides = ref(document.querySelector('[data-video-slides]'))
            const activeSlide = ref(document.querySelector('[data-video-show="active"]'))
            const nextSlideIndex = ref([...slides.value.children].indexOf(activeSlide.value) + offset.value)
            
            if(nextSlideIndex.value < 0) nextSlideIndex.value = slides.value.children.length - 1
            if(nextSlideIndex.value >= slides.value.children.length) nextSlideIndex.value = 0
            update(btns.value, activeBtn.value, slides.value, activeSlide.value, nextSlideIndex.value)
        }

        const goTo = (e) => {
            const n = ref(e.target.dataset.videoBtn)
            const btns = ref(document.querySelector(['[data-video-btns]']))
            const activeBtn = ref(document.querySelector('[data-video-active="active"]'))
            const slides = ref(document.querySelector('[data-video-slides]'))
            const activeSlide = ref(document.querySelector('[data-video-show="active"]'))

            if(n.value != activeBtn.value.dataset.videoBtn){
                update(btns.value, activeBtn.value, slides.value, activeSlide.value, n.value-1)
            }
        }

        const videosSlides = ref([
            {
                id: 1,
                image: "resource_02.jpg",
                title: 'What Dinosaurs ACTUALLY Looked Like?',
                description: 'The past is a vast and mysterious land that begins at the big bang and ends in the present, expanding with each passing moment. It is the home of everything that came before, the key to understanding our present. Here we find the most amazing creatures to ever roam our planet, hundreds of millions of species so diverse that our imagination cannot do them justice. Unfortunately the past carefully guards its secrets.',
                link: 'https://www.youtube.com/watch?v=xaQJbozY_Is'
            },
            {
                id: 2,
                image: "resource_07.jpg",
                title: 'How To Solve For The Area - Viral Math Problem',
                description: 'Thanks to Reio in Romania for emailing me this fun problem! What is the area? This puzzle was shared with the tagline "you should be able to solve this."',
                link: 'https://www.youtube.com/watch?v=BgrWHOocYZA'
            },
            {
                id: 3,
                image: "resource_12.jpg",
                title: 'ACCOUNTING BASICS: a Guide to (Almost) Everything',
                description: 'Would you like to know what Accounting REALLY MEANS? In this short tutorial we\'ll take 1 simple example and follow it through all 8 Steps of the Accounting Cycle - from start to finish - you\'ll build a solid understanding of all the Accounting Basics we encounter along the way. Stuff like the Accounting Equation, Debits & Credits, Double-Entry Accounting, T-Accounts, the Trial Balance etc.',
                link: 'https://www.youtube.com/watch?v=yYX4bvQSqbo'
            },
            {
                id: 4,
                image: "resource_23.jpg",
                title: 'SPM ENGLISH TIPS | SPM TIPS | SPM 9A+',
                description: 'In this video, I explain my last-minute tips on how to score in SPM English. So sorry for the terrible timing, I had college till 5 and I\'ve been making this video since. Hope this video helps you!',
                link: 'https://www.youtube.com/watch?v=G77rrZB53uc'
            },
        ])

        return { slideTo, goTo, videosSlides }
    },
    mounted(){
        const firstBtn = ref(document.querySelector('[data-video-btn="1"]'))
        firstBtn.value.dataset.videoActive = 'active'
        const firstSlide = ref(document.querySelector('[data-video-slide="1"]'))
        firstSlide.value.dataset.videoShow = 'active'
    }
}
</script>