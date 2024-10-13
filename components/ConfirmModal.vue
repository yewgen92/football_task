<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-white rounded shadow-lg p-5 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <h2 class="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Do you really want to delete <strong>{{ fullName }}</strong>?</p>
      <div class="mt-4 flex justify-end">
        <button @click="cancel" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
        <button @click="confirm" class="px-4 py-2 bg-red-500 text-white rounded">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  emits: ['confirmed', 'cancelled'],
  methods: {
    confirm() {
      this.$emit('confirmed');
    },
    cancel() {
      this.$emit('cancelled');
    },
  },
};
</script>
