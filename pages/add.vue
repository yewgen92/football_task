<template>
  <div class="h-screen bg-cover bg-center bg-gray-100 p-10">
    <h1 class="text-2xl mb-8 text-gray-600">Add user</h1>
    <div class="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
      <div class="bg-white rounded p-6 md:w-7/12 flex flex-col justify-between">
        <div class="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-6 md:space-y-0 mt-16"> 
          <div class="flex-col grow">
            <label for="first_name" class="block text-sm font-medium mt-1 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              v-model="firstName"
              class="border rounded p-2 w-full focus:outline-none"
              placeholder="Enter first name"
            />
          </div>
          <div class="flex-col grow">
            <label for="last_name" class="block text-sm font-medium mt-1 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              v-model="lastName"
              class="border rounded p-2 w-full focus:outline-none"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <button class="bg-green-600 text-white rounded p-3 max-w-40 mt-10" @click="addUser">Update details</button>
      </div>
      <div class="bg-white rounded p-6 md:w-4/12 flex flex-col items-center">
        <div class="mb-28 mt-10">
          <div class="p-0.5 border border-grey-300 rounded-full">
            <Avatar :src="linkAvatar" size="medium" />
          </div>
        </div>
        <button class="border rounded p-3 w-full" @click="modalIsOpened = true">
          <font-awesome-icon :icon="['fas', 'camera']" />
        </button>
        <LinkImageModal :visible="modalIsOpened" @confirmed="confirm" @cancelled="cancel" />
      </div>
    </div>
  </div>
</template>

<script>

import Avatar from '~/components/Avatar.vue'
import LinkImageModal from '~/components/LinkImageModal.vue'

export default {
  name: 'Add',

  components: {
    Avatar,
    LinkImageModal
  },

  data: () => ({
    modalIsOpened: false,
    linkAvatar: '',
    firstName: '',
    lastName: ''
  }),

  methods: {
    confirm(link) {
      this.linkAvatar = link;
      this.modalIsOpened = false;
    },

    cancel() {
      this.modalIsOpened = false;
    },
  
    async addUser() {
      try {
          const res = await fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.firstName.length > 0 && this.lastName.length > 0 ? 'eve.holt@reqres.in' : '', // Predefined user
              password: 'pistol',
            })
          });

          const data = await res.json(); // Parse the response

          if (res.ok) {
            // If the response is successful, show success and navigate
            setTimeout(() => {
              alert('User added successfully');
              this.$router.push('/');
            }, 1000);
          } else {
            // If response is not ok, display the error from the API
            alert(`Error: ${data.error}`);
          }
          

        } catch (error) {
          console.error('Error:', error); // Handle network or other errors
        }
    }


  }
}
</script>