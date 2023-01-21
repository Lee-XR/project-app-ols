<template>
  <div class="absolute top-0 left-0 w-3/12">
    <div class="h-screen pt-24 pr-4 bg-gray-300 bg-opacity-40 backdrop-blur-md shadow-xl dark:bg-gray-500 dark:bg-opacity-50 dark:text-gray-200">
        <nav class="flex flex-col justify-between">
            <router-link to="/">
                <div class="active flex flex-row justify-start items-center mb-3 pl-5 py-2 rounded-r-full group hover:text-primary hover:bg-white hover:bg-opacity-50">
                  <div class="bg-primary rounded-full w-10 h-10 flex flex-col justify-center border-2
                  border-primary text-white drop-shadow-md transition ease-in-out duration-200
                  group-hover:bg-white group-hover:text-primary group-hover:scale-x-105">
                    <font-awesome-icon icon="fa-solid fa-house" class="h-5 mx-auto" />
                  </div>
                  <div class="uppercase text-3xl px-4 py-1 drop-shadow-lg -translate-x-1 transition
                  ease-in-out duration-300 group-hover:translate-x-0 group-hover:bg-gradient-to-r
                  group-hover:from-transparent group-hover:to-transparent group-hover:scale-x-105">
                    <p class="drop-shadow-md tracking-wider"><b>HOME</b></p>
                  </div>
                </div>
            </router-link>

            <div class="flex justify-start items-baseline">
              <router-link :to="{ name:'browse' }">
                <div class="active flex flex-row justify-start items-center mb-3 pl-5 pr-3 py-2 rounded-r-full group hover:text-primary hover:bg-white hover:bg-opacity-50">
                  <div class="bg-primary rounded-full w-10 h-10 flex flex-col justify-center border-2 border-primary
                  text-white drop-shadow-md transition ease-in-out duration-200 group-hover:bg-white group-hover:text-primary group-hover:scale-x-105">
                    <font-awesome-icon icon="fa-solid fa-compass" class="h-5 mx-auto" />
                  </div>
                  <div class="uppercase text-3xl px-4 py-1 drop-shadow-lg -translate-x-1 transition ease-in-out
                  duration-300 group-hover:translate-x-0 group-hover:bg-gradient-to-r
                  group-hover:from-transparent group-hover:to-transparent group-hover:scale-x-105">
                    <p class="drop-shadow-md tracking-wider"><b>BROWSE</b></p>
                  </div>
                </div>
              </router-link>
              <button @click="dropdown" ref="btn" class="ml-9 transition ease-in-out duration-200 hover:scale-125 hover:-rotate-90 hover:-translate-y-1">
                  <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-6 w-6 hover:text-primary" />
              </button>
            </div>

            <TransitionGroup id="drop" v-if="toggleDropdown" appear tag="ul"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave">
                <li v-for="(type, index) in browseTypes" :key="index" :data-index="index">
                  <router-link :to="{ name:'browse', params:{ option:type.type } }">
                  <div class="active flex flex-row justify-start items-center mb-3 pl-10 pr-3 py-2 rounded-r-full group hover:text-primary hover:bg-white hover:bg-opacity-50">
                    <div class="bg-primary rounded-full w-10 h-10 flex flex-col justify-center border-2 border-primary
                    text-white drop-shadow-md transition ease-in-out duration-200 group-hover:bg-white group-hover:text-primary group-hover:scale-x-105">
                      <font-awesome-icon :icon="type.icon" class="h-5 mx-auto" />
                    </div>
                    <div class="uppercase text-3xl px-4 py-1 drop-shadow-lg -translate-x-1 transition ease-in-out
                    duration-300 group-hover:translate-x-0 group-hover:bg-gradient-to-r
                    group-hover:from-transparent group-hover:to-transparent group-hover:scale-x-105">
                      <p class="drop-shadow-md tracking-wider uppercase"><b>{{ type.type }}</b></p>
                    </div>
                  </div>
                </router-link>
                </li>
            </TransitionGroup>

            <router-link to="/profile">
              <div class="active flex flex-row justify-start items-center mb-3 pl-5 pr-3 py-2 rounded-r-full group hover:text-primary hover:bg-white hover:bg-opacity-50">
                <div class="bg-primary rounded-full w-10 h-10 flex flex-col justify-center border-2 border-primary
                text-white drop-shadow-md transition ease-in-out duration-200 group-hover:bg-white group-hover:text-primary group-hover:scale-x-105">
                  <font-awesome-icon icon="fa-solid fa-user" class="h-5 mx-auto" />
                </div>
                <div class="uppercase text-3xl px-4 py-1 drop-shadow-lg -translate-x-1 transition ease-in-out
                duration-300 group-hover:translate-x-0 group-hover:bg-gradient-to-r
                group-hover:from-transparent group-hover:to-transparent group-hover:scale-x-105">
                  <p class="drop-shadow-md tracking-wider"><b>PROFILE</b></p>
                </div>
              </div>
            </router-link>
        </nav>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import gsap from 'gsap'

export default {
    name: 'NavVue',
    setup(){
      const btn = ref(null)

      const browseTypes = ref([
        {
          id: 0,
          type: 'subject',
          icon: 'fa-solid fa-book-open'
        },
        {
          id: 1,
          type: 'category',
          icon: 'fa-solid fa-layer-group'
        }
      ])

      const toggleDropdown = ref(false)
      const dropdown = () => {
        if(toggleDropdown.value === false){
          toggleDropdown.value = !toggleDropdown.value
          btn.value.classList.add('-rotate-90', '-translate-y-1', 'hover:rotate-0')
        } else {
          const li = document.querySelectorAll('#drop li')
          for(let i = 0; i < li.length; i++) onLeave(li[i])
          setTimeout(() => {
            toggleDropdown.value = !toggleDropdown.value
            btn.value.classList.remove('-rotate-90', '-translate-y-1', 'hover:rotate-0')
          }, 700)
        }
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
          delay: el.dataset.index * 0.2,
          onComplete: done
        })
      }

      const onLeave = (el, done) => {
        gsap.to(el, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          delay: el.dataset.index * 0.2,
          onComplete: done
        })
      }

      return { btn, browseTypes, toggleDropdown, dropdown, onBeforeEnter, onEnter, onLeave }
    }
}
</script>