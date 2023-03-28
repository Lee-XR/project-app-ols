<template>
    <div class="flex flex-col">
      <HeaderVue></HeaderVue>
      <searchBarVue></searchBarVue>
      <div class="relative my-4 py-1 flex flex-col items-center">

        <!-- Page title -->
        <div class="w-full px-48">
            <div class="mx-auto mb-5 pt-1 pb-2 border-b-4 border-black text-center dark:text-gray-200 dark:border-gray-200">
              <h1 class="text-5xl tracking-wide"><b>PROFILE</b></h1>
            </div>
        </div>

        <!-- Profile display -->
        <ProfileVue></ProfileVue>
        <hr class="w-11/12 border-t-2 border-gray-400 dark:border-gray-200 my-5">

        <!-- Bookmarks section -->
        <div class="w-full px-48">
          <div class="mx-auto mt-5 mb-10 pt-1 pb-2 border-b-4 border-black text-center dark:text-gray-200 dark:border-gray-200">
              <h1 class="text-5xl tracking-wide"><b>BOOKMARKS</b></h1>
          </div>

          <div class="bg-gray-200 w-full h-full my-5 pb-3 rounded-2xl dark:bg-gray-500">
            <BookmarkVue></BookmarkVue>
          </div>
        </div>

      </div>
      <FooterVue></FooterVue>
      <ScrollTopBtn></ScrollTopBtn>
    </div>
  </template>
  
  <script>
  import HeaderVue from '@/components/Header.vue';
  import FooterVue from '@/components/Footer.vue';
  import searchBarVue from '@/components/searchBar.vue';
  import ProfileVue from '@/components/Profile.vue';
  import BookmarkVue from '@/components/Bookmark.vue';
  import ScrollTopBtn from '@/components/ScrollTopBtn.vue';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  export default {
    name: 'ProfileView',
    components: { HeaderVue, FooterVue, searchBarVue, ProfileVue, BookmarkVue, ScrollTopBtn },
    setup(){
      const router = useRouter()
      const store = useStore()

      onMounted(() => {
        if(store.state.userId === null){
          router.push('/login')
        }
      })
    }
  }
  </script>