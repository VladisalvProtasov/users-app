<template>
  <div
      class="theme-toggle"
      :class="{ dark: isDark }"
      @click="$emit('toggle-theme')"
  >
    <v-icon
        class="icon sun"
    >
      mdi-white-balance-sunny
    </v-icon>
    <div class="toggle-ball"></div>
    <v-icon
        class="icon moon"
    >
      mdi-moon-waning-crescent
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    isDark: Boolean
  }
};
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 30px;
  border-radius: 20px;
  padding: 4px 8px;
  background-color: var(--toggle-bg);
  cursor: pointer;
  transition: background-color 0.3s ease;
  --toggle-bg: #f3f3f3;
}

.theme-toggle.dark {
  --toggle-bg: #222;
}

.icon {
  font-size: 18px;
  transition: color 0.3s ease;
}

.icon.sun {
  color: #f1c40f;
  left: -2px;
  z-index: 1;
}

.icon.moon {
  color: #555;
  right: -4px;
}

.theme-toggle.dark .icon.sun {
  color: #777;
}

.theme-toggle.dark .icon.moon {
  color: #ffd166;
}

.toggle-ball {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: left 0.3s ease, background-color 0.3s ease;
}

.theme-toggle.dark .toggle-ball {
  left: 34px;
  background-color: #444;
}
</style>
