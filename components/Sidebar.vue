<template>
  <div
      :class="['sidebar', { expanded: !collapsed }]"
  >
    <div
        class="sidebar__header"
    >
      <v-icon>
        {{'mdi-account-tie'}}
      </v-icon>
      <div
          v-if="!collapsed"
          class="sidebar__name"
      >
        Михаил Макеев
      </div>
      <v-btn
          icon
          @click="$emit('toggle-collapse')">
        <v-icon>
          mdi-chevron-left
        </v-icon>
      </v-btn>
    </div>
    <nuxt-link
      v-for="item in list"
      :key="item.title"
      height="36px"
      class="icon-page"
      exact-active-class="active"
      :to="item.link">
      <v-icon>
        {{ item.icon }}
      </v-icon>
      <div
        v-if="!collapsed"
        :style="{ color: textColor }"
      >
        {{item.title}}
      </div>
    </nuxt-link>
    <div style="flex:1"></div>
    <ThemeSwitch
      :isDark="isDark"
      @toggle-theme="$emit('toggle-theme')" />
  </div>
</template>

<script>
import ThemeSwitch from "~/components/ThemeSwitch.vue";

export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    ThemeSwitch,
  },
  computed: {
    textColor() {
      return this.isDark ? '#FFF' : '#222';
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  display:flex;
  flex-direction:column;
  padding:12px;
  margin-bottom: 20px;
  &__header {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    padding-left: 10px;
  }
}
.icon-page {
  margin: 12px 0;
  padding: 5px 10px;
  height: 36px;
  width: 44px;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  gap: 10px;
  background: transparent;
  cursor: pointer;
  &.active {
    background: rgba(145, 142, 142, 0.24);
  }
  &:hover {
    background: rgba(145, 142, 142, 0.24);
  }
}
.expanded {
  .icon-page {
    width:100%;
  }
}
</style>
