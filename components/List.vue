<template>
  <div>
    <table class="w-full mt-4">
      <thead>
        <tr>
          <th class="p-4 w-1/10"/>
          <th class="text-left text-gray-600 p-4 w-4/5">Full Name</th>
          <th class="text-left text-gray-600 p-4 w-1/10">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" 
          :class="index % 2 === 1 ? 'bg-white' : 'bg-gray-100'">
          <td class="p-4 rounded-l w-1/10">
            <Avatar :src="user.avatar" size="small" />
          </td>
          <td class="p-4 w-4/5">
            {{ user.first_name }} {{ user.last_name }}
          </td>
          <td class="p-4 rounded-r w-1/10 items-center">
            <div class="flex justify-between items-center max-w-12">
              <button @click="$router.push(`/edit/${user.id}`)">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-gray-400" />
              </button>
              <button @click="openPopup(user)">
                <font-awesome-icon :icon="['fas', 'trash']" class="text-gray-400" />
              </button>
            </div>
          </td>
        </tr>

      </tbody>
    </table>
    <ConfirmModal :visible="popupIsOpened" :fullName="userNameToDelete" @confirmed="deleteUser" @cancelled="cancelDelete" />
  </div>
  
</template>

<script>
import Avatar from './Avatar'
import ConfirmModal from './ConfirmModal'

export default {
  name: 'List',

  props: {
    users: Array
  },

  data() {
    return {
      popupIsOpened: false,
      idToDelete: null,
      userNameToDelete: '',
    };
  },

  components: {
    Avatar,
    ConfirmModal,
  },

  emits: ['init'],

  methods: {
    async deleteUser() {
      try {
        const res = await fetch(`https://reqres.in/api/users/${this.idToDelete}`, {
          method: 'DELETE',
        });
        this.cancelDelete()
        await this.$emit('init');
        setTimeout(() => {
          alert('User was successfully deleted');
        }, 1000);
        
      } catch (error) {
        console.error(error);
      }
    },

    cancelDelete() {
      this.idToDelete = null;
      this.userNameToDelete = '';
      this.popupIsOpened = false;
    },

    openPopup(user) {
      this.idToDelete = user.id;
      this.userNameToDelete = `${user.first_name} ${user.last_name}`;
      this.popupIsOpened = true;
    }
  },
}
</script>

