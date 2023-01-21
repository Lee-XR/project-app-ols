<template>
  <div class="flex flex-col">
    <HeaderVue></HeaderVue>
    <searchBarVue></searchBarVue>
    <div class="relative my-8 py-1 px-48 flex flex-col items-center">
        <div class="relative w-full">
            <!-- Back button -->
            <button @click="result = !result" v-if="result" class="absolute inset-y-0 my-auto -left-24 w-14 h-14 mr-10 flex justify-center items-center
            bg-gray-300 rounded-full border-primary transition duration-200 ease-in-out hover:border-2 hover:scale-110
            hover:bg-white hover:text-primary dark:bg-gray-500 dark:text-gray-200 
            dark:hover:bg-white dark:hover:text-primary">
                <font-awesome-icon icon="fa-solid fa-rotate-left" class="h-9 w-h-9" />
            </button>
            <!-- Page title -->
              <div class="mx-auto mb-5 pt-1 pb-2 border-b-4 border-black text-center dark:text-gray-200 dark:border-gray-200">
                  <h1 v-if="!result" class="text-5xl tracking-wide"><b>BROWSE</b></h1>
                  <h1 v-else class="text-5xl tracking-wide"><b>RESULT</b></h1>
              </div>
        </div>

        <!-- Browse Page content area -->
        <Transition
          enter-active-class="duration-300 ease-in-out"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="duration-300 ease-in-out"
          leave-to-class="opacity-0 translate-y-2">
          <div class="bg-gray-200 w-full h-full my-5 pb-3 rounded-2xl dark:bg-gray-500">
            <keep-alive v-if="!result">
                <BrowseVue @showResult="display"></BrowseVue>
            </keep-alive>
              <ResultVue v-else :resultOption="resultOption" :resultId="resultId"></ResultVue>
          </div>
        </Transition>
      </div>
    <FooterVue></FooterVue>
    <ScrollTopBtn></ScrollTopBtn>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';
import searchBarVue from '@/components/searchBar.vue';
import BrowseVue from '@/components/Browse.vue';
import ResultVue from '@/components/Result.vue';
import ScrollTopBtn from '@/components/ScrollTopBtn.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

export default {
    name: 'BrowseView',
    components: { HeaderVue, FooterVue, searchBarVue, BrowseVue, ResultVue, ScrollTopBtn },
  setup(){
    const result = ref(false)
    const resultOption = ref(null)
    const resultId = ref(null)
    const router = useRouter()
    const store = useStore()

    onMounted(() => {
      if(store.state.userId === null){
        router.push('/login')
      }
    })

    gsap.registerPlugin(ScrollToPlugin)
    watch(result, () => {
      gsap.to(window, {duration: 0.5, scrollTo: {y: 0}, ease: 'power2'})
    })

    const display = (option, id) => {
      resultOption.value = option
      resultId.value = id
      result.value = !result.value
    }

    return { result, display, resultOption, resultId }
  }
}
</script>