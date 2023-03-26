<template>
  <div class="flex flex-col">
    
    <HeaderVue></HeaderVue>
    <Transition appear
      enter-active-class="delay-300 duration-700 ease-in-out"
      enter-from-class="-translate-y-full">
      <div>
        <SearchVue @scrollNext="scrollNext"></SearchVue>
      </div>
    </Transition>
    <div id="nextEl">
      <NewsCarouselVue></NewsCarouselVue>
    </div>
    <VideosCarouselVue></VideosCarouselVue>
    <UsefulResourcesVue></UsefulResourcesVue>
    <FooterVue></FooterVue>
    <ScrollTopBtn></ScrollTopBtn>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';
import SearchVue from '@/components/Search.vue';
import NewsCarouselVue from '@/components/NewsCarousel.vue';
import VideosCarouselVue from '@/components/VideosCarousel.vue';
import UsefulResourcesVue from '@/components/UsefulResources.vue';
import ScrollTopBtn from '@/components/ScrollTopBtn.vue';
// import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin';

export default {
  name: 'HomeView',
  components: { HeaderVue, SearchVue, FooterVue, NewsCarouselVue, VideosCarouselVue, UsefulResourcesVue, ScrollTopBtn },
  setup(){
    // const router = useRouter()
    // const store = useStore()

    // onMounted(() => {
    //   if(store.state.userId === null){
    //     router.push('/login')
    //   }
    // })

    gsap.registerPlugin(ScrollToPlugin)
    const scrollNext = () => {
      gsap.to(window, {duration: 1, scrollTo: {y: "#nextEl", offsetY: 80}, ease: "power2"})
    }

    return { scrollNext }
  }
}
</script>
