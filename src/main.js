import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faArrowRight, faArrowTrendUp, faAtom, faBars, faBook, faBookmark, faBookOpen, faCalculator, faCalendar, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCircleExclamation, faCloudArrowUp, faCommentsDollar, faCompass, faDownload, faDownLong, faEnvelope, faFlask, faFloppyDisk, faGraduationCap, faHouse, faLandmark, faLanguage, faLayerGroup, faMagnifyingGlass, faMoon, faPenToSquare, faRightFromBracket, faRightToBracket, faRotateLeft, faScroll, faSeedling, faSpinner, faSun, faSuperscript, faTv, faUser, faVenusMars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faSquareYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
library.add(faRightToBracket, faArrowRight, faPenToSquare, faArrowLeft, faBars, faXmark, faRightFromBracket, faSun, 
    faMoon, faSquareFacebook, faSquareTwitter, faSquareInstagram, faSquareYoutube, faCopyright, faHouse, faCompass, 
    faUser, faChevronLeft, faChevronRight, faChevronDown, faBookOpen, faLayerGroup, faMagnifyingGlass, faDownLong, 
    faRotateLeft, faSuperscript, faLanguage, faSeedling, faAtom, faFlask, faCommentsDollar, faCalculator, faLandmark, 
    faBook, faTv, faScroll, faEnvelope, faGraduationCap, faCalendar, faVenusMars, faSpinner, faCircleExclamation,
    faArrowTrendUp, faDownload, faBookmark, faCloudArrowUp, faFloppyDisk, faChevronUp)

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

axios.defaults.baseURL = process.env.VUE_APP_DEV_URL;
axios.defaults.withCredentials = true;