<script setup>
import { ref } from 'vue'

const props = defineProps(["items"]);

const isOpen = ref(false);

const active = ref('Options');

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const select = (label) => {
  active.value = label
  isOpen.value = false;
};
</script>

<template>
  <div class="relative inline-block text-left w-full">
    <div>
      <button
        @click="toggleMenu"
        type="button"
        class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        id="menu-button"
        aria-haspopup="true"
        :aria-expanded="isOpen"
      >
        {{ active }} 
        <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-full"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div class="py-1" role="none">
        <a
          v-for="(item, index) in props.items"
          :key="index"
          :href="item.href"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          @click="select(item.label)"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </div>
</template>
