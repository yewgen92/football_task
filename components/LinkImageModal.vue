<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-white rounded shadow-lg p-5 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div class="flex-col grow">
        <h2 class="text-lg font-semibold mb-4">Please paste image link below</h2>
        <label for="last_name" class="block text-sm font-medium mt-1 mb-2">
          Link
        </label>
        <input
          type="text"
          name="image_link"
          v-model="linkAvatar"
          id="image_link"
          class="border rounded p-2 w-full focus:outline-none"
          placeholder="htttp://example.com/image.jpg"
        />
      </div>
      
      <div class="mt-4 flex justify-end">
        <button @click="cancel" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
        <button @click="confirm" class="px-4 py-2 bg-green-500 text-white rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },

      link: {
        type: String,
        default: '',
      },
    
    },

    data() {
      return {
        linkAvatar: ''
      };
    },

    async created() {
      this.linkAvatar = this.link;
    },

    watch: {
      link(newVal) {
        this.linkAvatar = newVal;
      }
    },

    emits: ['confirmed', 'cancelled'],

    methods: {
      confirm() {
        this.$emit('confirmed', this.linkAvatar);
      },

      cancel() {
        this.$emit('cancelled');
      },
    },
  }
</script>