<template>
  <v-app :dark="$vuetify.theme.dark">
    <div
        class="layout"
    >
      <Sidebar
        :collapsed="sidebarCollapsed"
        :isDark="$vuetify.theme.dark"
        :list="menuList"
        @toggle-theme="toggleTheme"
        @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
      />

      <div class="content">
        <main class="main-content">
          <nuxt />
        </main>
      </div>
    </div>
  </v-app>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: { Sidebar },
  data() {
    return {
      sidebarCollapsed: true,
      menuList: [
        {
          title: 'Торговые точки',
          link: '/',
          icon: 'mdi-store',
        },
        {
          title: 'Кофемашины',
          link: '/',
          icon: 'mdi-cog',
        },
        {
          title: 'Партнеры',
          link: '/',
          icon: 'mdi-handshake',
        },
        {
          title: 'Сотрудники',
          link: '/',
          icon: 'mdi-account-group',
        },
        {
          title: 'Напитки',
          link: '/',
          icon: 'mdi-coffee',
        },
        {
          title: 'Абонементы',
          link: '/',
          icon: 'mdi-card-account-details',
        },
        {
          title: 'Активные абонементы',
          link: '/',
          icon: 'mdi-card-account-details',
        },
        {
          title: 'Пользователи',
          link: '/users',
          icon: 'mdi-account-group',
        },
      ]
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .main-content {
      padding: 16px;
      overflow-y: auto;
    }
  }
}
</style>
