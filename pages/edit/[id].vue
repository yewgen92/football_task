<template>
  <div class="h-screen bg-cover bg-center bg-gray-100 p-10">
    <h1 class="text-2xl mb-8 text-gray-600" >Edit or delete user</h1>
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
        <div class="flex justify-between mt-10">
          <button class="bg-green-600 text-white rounded p-3 max-w-40" @click="updateUser">Update details</button>
          <button class="bg-red-600 text-white rounded p-3 max-w-40" @click="deleteUser">Delete User</button>
        </div>
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
        <LinkImageModal :visible="modalIsOpened" :link="linkAvatar" @confirmed="confirm" @cancelled="cancel" />
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      modalIsOpened: false,
      linkAvatar: '',
      firstName: '',
      lastName: '',
      userId: null,

    };
  },

  async created() {
    
    this.userId  = this.$route.params.id;

    try {
      const response = await fetch(`https://reqres.in/api/users/${this.userId}`);
      const data = await response.json();

      if (response.ok) {
        this.firstName = data.data.first_name;
        this.lastName = data.data.last_name;
        this.linkAvatar = data.data.avatar;
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async deleteUser() {
      try {
        const res = await fetch(`https://reqres.in/api/users/${this.userId}`, {
          method: 'DELETE',
        });
        setTimeout(() => {
          alert('User was successfully deleted');
          this.$router.push('/');
        }, 1000);
        
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser() {
      try {
        const res = await fetch(`https://reqres.in/api/users/${this.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: this.firstName,
            last_name: this.lastName,
            avatar: this.linkAvatar
          })
        });
        const data = await res.json(); // Parse the response

        if (res.ok) {
          setTimeout(() => {
            alert('User updated successfully');
            this.$router.push('/');
          }, 1000);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    confirm(link) {
      this.linkAvatar = link;
      this.modalIsOpened = false;
    },

    cancel() {
      this.modalIsOpened = false;
    },
  },

}
</script>
