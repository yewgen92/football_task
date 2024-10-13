import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPenToSquare, faSearch, faTrash, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'; // Import the 'plus' icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the icons you want to use
library.add( faPlus, faPenToSquare, faSearch, faTrash, faUser, faCamera);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});

