<template>
  <div class="relative w-full max-w-sm">
    <input
      type="text"
      class="w-full pl-4 pr-4 py-2 bg-gray-100 rounded focus:outline-none"
      placeholder="Search for users..."
    />
    <font-awesome-icon
      :icon="['fas', 'search']"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    />
  </div>
</template>

<script lang="js">

export default {
  name: 'SearchInput'
}
</script>
