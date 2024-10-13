<template>
  <div
    :class="[
      'flex items-center justify-center bg-gray-300 rounded-full overflow-hidden',
      size === 'medium' ? 'w-40 h-40' : 'w-12 h-12'
    ]"
  >
    <img v-if="isValidAvatar" :src="src" alt="avatar" class="w-full h-full object-cover" />
    <font-awesome-icon
      v-else
      :icon="['fas', 'user']"
      class="text-gray-500"
      :class="size === 'medium' ? 'text-4xl' : 'text-sm'"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',

  props: {
    src: String,
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['small', 'medium'].includes(value)
    }
  },

  data() {
    return {
      isValidAvatar: false, // This will be true if the image is valid
    };
  },

  watch: {
    src: {
      immediate: true,
      handler(newSrc) {
        this.checkImage(newSrc);
      },
    },
  },
  
  methods: {
    checkImage(url) {
      const img = new Image();
      img.onload = () => {
        this.isValidAvatar = true; // If image loads successfully, it's valid
      };
      img.onerror = () => {
        this.isValidAvatar = false; // If image fails to load, it's invalid
      };
      img.src = url;
    },
  },
}

</script>
