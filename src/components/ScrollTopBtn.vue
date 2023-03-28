<template>
  <button @click="scrollToTop" class="fixed bottom-10 right-5 w-20 h-20 rounded-md border-primary bg-gray-400 opacity-50 
    flex justify-center items-center transition duration-200 ease-in-out hover:bg-opacity-100 
    hover:border-2 hover:opacity-100 hover:shadow-xl hover:text-primary hover:scale-105 hover:bg-gray-200 
    dark:bg-gray-500 dark:text-gray-200 dark:hover:text-primary dark:hover:bg-gray-200">
        <font-awesome-icon icon="fa-solid fa-chevron-up" class="w-14 h-14 m-auto" />
    </button>
</template>

<script>
import gsap from 'gsap';

export default {
    name: 'ScrollTopBtnVue',
    setup(){
        const scrollToTop = () => {
            gsap.to(window, {duration: 0.8, scrollTo: {y: 0}, ease: 'power2'})
        }

        return { scrollToTop }
    }
}
</script>

<style>

</style>