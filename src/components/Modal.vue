<template>
<Transition  
    enter-active-class="duration-200 ease-in-out"
    enter-from-class="opacity-0 scale-110"
    leave-active-class="duration-200 ease-in-out"
    leave-to-class="opacity-0 scale-110">
    <div v-if="show" class="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-50">
        <div class="absolute w-5/6 h-5/6 inset-0 m-auto p-3 flex flex-col justify-start 
        bg-white rounded-xl drop-shadow-2xl dark:bg-gray-700 dark:text-gray-200">
            <div class="rounded-full absolute mt-2 mr-2 self-end border-primary border-2 bg-primary text-white 
            transition duration-200 ease-in-out hover:bg-white hover:text-primary hover:scale-125 
            focus-within:outline-none focus-within:bg-white focus-within:text-primary focus-within:scale-125">
                <button @click="$emit('close')" class="rounded-full flex justify-center focus-within:outline-none">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="h-7 w-7"/>
                </button>
            </div>
            <slot></slot>
        </div>
    </div>
</Transition>
</template>

<script>
import { Transition } from 'vue';


export default {
    name: "ModalVue",
    props: ["show"],
    setup() {
    },
    components: { Transition }
}
</script>