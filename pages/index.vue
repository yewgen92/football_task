<template>
  <div class="h-screen bg-cover bg-center bg-gray-100 p-10">
    <h1 class="text-2xl mb-8 text-gray-600">User list</h1>
    <div class="rounded bg-white p-6">
      <div class="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-gray-100">
        <SearchInput class="mb-4" />
        <nuxt-link to="/add" class="bg-green-600 rounded-full text-white p-2 px-4 inline-block">
          <font-awesome-icon :icon="['fas', 'plus']" class="mr-3" />Add User
        </nuxt-link>
      </div>
      <List :users="users" @init="initData" />

    </div>

    <Pagination
      :current-page="currentPage"
      :total-items="totalUsers"
      :items-per-page="usersPerPage"
      @page-changed="currentPage = $event"
    />
  </div>
</template>

<script>
import Pagination from '~/components/Pagination.vue'
import SearchInput from '~/components/SearchInput.vue'
import List from '~/components/List.vue'

export default {
  name: 'UserList',
  components: {
    Pagination,
    SearchInput,
    List
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      totalUsers: 0,
      usersPerPage: 6,
    };
  },

  async created() {
    await this.initData();
  },

  watch: {
    currentPage() {
      this.initData();
    }
  },

  methods: {

    async fetchData(pageNumber) {
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
        const parsed = await res.json();
        return parsed;
      } catch (error) {
        console.error(error);
      }
    },

    async initData() {
      const res = await this.fetchData(this.currentPage)
      this.users = res.data;
      this.totalUsers = res.total;
      this.usersPerPage = res.per_page;
    }
  }
}
</script>