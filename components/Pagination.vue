<template>
  <div class="flex justify-start mt-12 items-center">
    <button
      :disabled="currentPage === 1"
      @click="prevPage"
      class="bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-l hover:bg-green-500 hover:text-white"
    >
      <span>«</span>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      :class="{
        'bg-green-600 text-white border-green-600': page === currentPage,
        'bg-white text-gray-700 border-gray-300': page !== currentPage,
      }"
      class="px-3 py-2 hover:bg-green-500 hover:text-white border"
    >
      {{ page }}
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="nextPage"
      class="bg-white text-gray-800 px-3 py-2 rounded-r border border-gray-300 hover:bg-green-500 hover:text-white"
    >
      <span>»</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',

    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalItems: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        default: 10,
      },
    },

    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      }
    },

    methods: {
      setPage(page) {
        if (page !== this.currentPage) {
          this.$emit('page-changed', page);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('page-changed', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('page-changed', this.currentPage + 1);
        }
      },
    },
    
  }
</script>
