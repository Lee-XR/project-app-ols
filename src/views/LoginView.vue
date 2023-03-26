<template>
<div class="relative">
    <div class="flex flex-col justify-center my-auto h-screen relative">
        <div class="bg-neutral-200 rounded-2xl mx-11 px-10 py-3 shadow-lg dark:bg-gray-500">

            <div ref="row" class="bg-white rounded-2xl mx-20 my-5 relative shadow-2xl flex justify-start dark:bg-gray-700">
                <Transition appear 
                    enter-active-class="delay-200 duration-500 ease-in-out"
                    enter-from-class="scale-90 opacity-0"
                    leave-active-class="delay-200 duration-500 ease-in-out"
                    leave-to-class="scale-90 opacity-0">
                        <LoginVue @register="needRegister"></LoginVue>
                </Transition>
                <Transition appear
                    enter-active-class="delay-200 duration-500 ease-in-out"
                    enter-from-class="scale-90 opacity-0">
                    <RegisterVue @register="needRegister"></RegisterVue>
                </Transition>

                <!-- Sliding div -->
                <div id="slide" ref="slide" class="absolute inset-y-0 my-auto right-0 w-1/2 py-10 h-fit rounded-2x border-2 border-opacity-80
                rounded-2xl bg-white flex flex-col drop-shadow-xl dark:bg-gray-700">
                    <h2 class="text-4xl mt mb-4 mx-auto text-primary dark:text-secondary"><b>Welcome To</b></h2>
                    <svg class="w-2/3 mx-auto drop-shadow-lg stroke-primary fill-primary dark:stroke-secondary dark:fill-secondary" xmlns="http://www.w3.org/2000/svg" width="497.72" height="80.65" viewBox="0 0 497.72 80.65"><path d="M45.23,50.27H23c-11.67,0-21.14-8.6-21.14-19.22h0c0-10.61,9.47-19.21,21.14-19.21h49.2" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="3"/><path d="M26.48,50.27H51.09c11.68,0,21.14,8.6,21.14,19.21h0c0,10.62-9.46,19.22-21.14,19.22H1.89" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="3"/><path d="M23.1,6.61H62.49a0,0,0,0,1,0,0V35.15a0,0,0,0,1,0,0H23.1A14.27,14.27,0,0,1,8.83,20.88v0A14.27,14.27,0,0,1,23.1,6.61Z" fill="#f4a857"/><path d="M25.82,55.27H65.21a0,0,0,0,1,0,0V83.81a0,0,0,0,1,0,0H25.82A14.27,14.27,0,0,1,11.55,69.54v0A14.27,14.27,0,0,1,25.82,55.27Z" transform="translate(76.37 129.4) rotate(-180)" fill="#f2e64b"/><path d="M24.92,16.29c-8.67,0-15.69,6.38-15.69,14.27s7,14.27,15.69,14.27" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><path d="M49.51,55.21c8.67,0,15.7,6.39,15.7,14.27s-7,14.28-15.7,14.28" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="16.7" y1="21.56" x2="64.82" y2="21.56" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="16.7" y1="28.56" x2="64.82" y2="28.56" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="8.83" y1="66.81" x2="54.76" y2="66.81" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="8.83" y1="52.81" x2="54.76" y2="52.81" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="16.7" y1="14.56" x2="64.82" y2="14.56" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><line x1="8.83" y1="59.81" x2="54.76" y2="59.81" fill="none" stroke="" stroke-miterlimit="10" stroke-width="1.5"/><polygon points="136.27 1.02 79.84 1.02 79.84 12.4 102.37 12.4 102.37 79.93 113.75 79.93 113.75 12.4 136.27 12.4 136.27 1.02" fill=""/><path d="M142.18,11.07,142.07,63a31.63,31.63,0,0,0,7,18.13c6.12,7.58,18.25,8.49,18.25,8.49s11.15.45,19.58-10.09a32.28,32.28,0,0,0,5.73-17.4c.46-10.69,0-51,0-51h-10.2v48.7s2.19,15-12.41,19.59a9.82,9.82,0,0,1-5.95,0c-4.43-1.4-11.79-5.52-11.79-17.5,0-17.12.11-50.8.11-50.8Z" transform="translate(-0.39 -9.67)" fill=""/><rect x="203.97" y="5.85" width="59.02" height="56.31" rx="4.53" fill="#f4a857"/><path d="M208.51,5.83h2a3.52,3.52,0,0,1,3.52,3.52V58.62a3.52,3.52,0,0,1-3.52,3.52h-2A4.53,4.53,0,0,1,204,57.6V10.37a4.53,4.53,0,0,1,4.53-4.53Z" fill="#f2e64a"/><path d="M270.11,88.7h-50.2c-11.68,0-19.9,0-19.9-6.72h0c0-8,8.22-6.73,19.9-6.73h42.2" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="3"/><path d="M200,18.68a6.49,6.49,0,0,1,6.48-6.49l54.88-.07a6.49,6.49,0,0,1,6.5,6.49V68.74a6.49,6.49,0,0,1-6.48,6.49l-50.6.07" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><line x1="199.56" y1="7.58" x2="199.56" y2="49.09" fill="none" stroke="" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><line x1="199.56" y1="53.25" x2="199.56" y2="58.41" fill="none" stroke="" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><line x1="199.62" y1="62.83" x2="199.62" y2="63.83" fill="none" stroke="" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><line x1="212.81" y1="4.83" x2="212.81" y2="63.14" fill="none" stroke="" stroke-miterlimit="10" stroke-width="3"/><path d="M208.7,68.22H263a0,0,0,0,1,0,0v8.09a0,0,0,0,1,0,0H208.7a4,4,0,0,1-4-4v0A4,4,0,0,1,208.7,68.22Z" fill="#f4a857"/><line x1="209.21" y1="72.48" x2="264.77" y2="72.48" fill="none" stroke="" stroke-miterlimit="10" stroke-width="0.75"/><line x1="209.21" y1="74.68" x2="264.77" y2="74.68" fill="none" stroke="" stroke-miterlimit="10" stroke-width="0.75"/><line x1="209.21" y1="70.27" x2="264.77" y2="70.27" fill="none" stroke="" stroke-miterlimit="10" stroke-width="0.75"/><path d="M213.2,85.87c-6.08,0-7.7.12-8.39-3.91h0c.24-4.89,3.86-4.07,8.39-4.07" transform="translate(-0.39 -9.67)" fill="none" stroke="" stroke-miterlimit="10" stroke-width="0.75"/><polygon points="335.86 0.7 311.68 33.39 288.76 0.42 273.19 0.42 303.62 44.2 303.68 44.2 276.72 80.65 292.29 80.65 351.44 0.7 335.86 0.7" fill=""/><rect x="350.65" y="44.49" width="27.86" height="7.35" rx="2.81" fill=""/><path d="M444.53,54l-5.27-13.19-5.14,13.4v5.43s2.19,15-12.41,19.6a9.93,9.93,0,0,1-6,0C411.33,77.8,404,73.67,404,61.69c0-10.64.05-22.7.08-30.3a20.42,20.42,0,0,1,8.1,4.65c.14-20.46-12.61-26.37-12.61-26.37C385.85,19.13,386.92,36,386.92,36a21.86,21.86,0,0,1,6.93-4.29l-.09,31a31.65,31.65,0,0,0,7,18.14C406.88,88.5,419,89.4,419,89.4s11.14.46,19.58-10.09a31.94,31.94,0,0,0,5.73-17.39C444.67,53,444.53,54,444.53,54Z" transform="translate(-0.39 -9.67)" fill=""/><polygon points="452.05 77.82 461.62 77.82 461.62 49.62 452.05 77.82" fill=""/><polygon points="452.05 77.82 452.05 4.56 461.62 11.49 461.62 49.62 452.05 77.82" fill=""/><path d="M452.44,14.23,462,21.16s8.91-1.3,13.5-.54a18.28,18.28,0,0,1,7.26,2.71s2.52.92,4.51,5.32a15.17,15.17,0,0,1,1.07,8.63s.38,2-2.64,7.11-10.24,5.85-10.24,5.85a53,53,0,0,1-13.46.27v7.43A54.68,54.68,0,0,0,479,57.42c6.35-1.25,12.42-5.19,14.37-8.21s3.06-4.4,3.78-7.19,1.34-8.41.81-10.39-.69-7.61-6-12.39a25.94,25.94,0,0,0-12.49-5.73S465.05,12.44,452.44,14.23Z" transform="translate(-0.39 -9.67)" fill=""/></svg>
                    <img src="https://institute.careerguide.com/wp-content/uploads/2020/09/happy-elearning.gif" alt="GIF" 
                    class="mx-auto mb-6 w-4/5 rounded-md shadow-xl dark:brightness-90">
                    <div class="mx-auto px-10 text-xl text-center text-primary dark:text-secondary"><i>A Digital Library Platform for Enhancing Your Learning Experience</i></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import LoginVue from '@/components/Login.vue'
import RegisterVue from '@/components/Register.vue'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

export default{
    name: 'LoginView',
    components: { LoginVue, RegisterVue },
    setup(){
        const slide = ref()
        const show = ref(false)
        const row = ref()
        const x = ref()

        onMounted(() => {
            x.value = row.value.getBoundingClientRect()
        })

        gsap.registerPlugin(MotionPathPlugin)
        const needRegister = (register) => {
            if(register){
                slide.value.classList.remove('right-0')
                slide.value.classList.add('left-0')
                gsap.to('#slide', {
                    motionPath: {
                        path: [{x: x.value.right}, {x: x.value.left}],
                        align: [{x: x.value.x}],
                        alignOrigin: [0, 0.5],
                        start: 0.76,
                        end: 1
                    },
                    duration: 0.6,
                    ease: 'power2.inOut'
                })
            } else {
                slide.value.classList.remove('left-0')
                slide.value.classList.add('right-0')
                gsap.to('#slide', {
                    motionPath: {
                        path: [{x: x.value.left}, {x: x.value.right}],
                        align: [{x: x.value.x}],
                        alignOrigin: [0, 0.5],
                        start: 0.13,
                        end: 0.475
                    },
                    duration: 0.6,
                    ease: 'power2.inOut'
                })
            }
            show.value = register
        }

        return { slide, needRegister, show, row }
    }
}

</script>

