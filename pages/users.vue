<template>
  <div
      class="page-users"
  >
    <div
        class="top-bar"
    >
      <div
          class="title"
      >
        Пользователи
      </div>
      <v-btn
          small
          @click="refresh"
      >
        Обновить
      </v-btn>
    </div>
    <div
        class="controls"
    >
      <v-text-field
        v-model="phone"
        label="Поиск по имени или телефону"
        dense
        clearable
        @input="onSearch"
      />
      <v-select
        v-model="selectedCities"
        :items="citiesList"
        :dark="isDark"
        :item-color="textColor"
        item-text="title"
        item-value="id"
        label="Фильтр по городам"
        multiple
        dense
        clearable
        attach
      />
      <v-select
        v-model="perPage"
        :items="[25,50,100]"
        :item-color="textColor"
        :dark="isDark"
        label="На страницу"
        dense
        attach
        hide-details
        style="width:120px"
      />
    </div>

    <div
        v-if="loading"
    >
      <div
          class="users-list"
      >
        <div
            class="skeleton"
            v-for="n in 10" :key="n"
        >
          <SkeletonUser />
        </div>
      </div>
    </div>

    <div v-else>
      <div
          class="users-list"
          v-if="pagedItems.length"
      >
        <UserItem
          v-for="user in pagedItems"
          :key="user.id"
          :user="user"
          :dark="isDark"
          @open="openUser"
          @city-click="openCity"
        />
      </div>
      <div
          v-else
      >
        Ничего не найдено
      </div>
      <div
          class="pagination"
          v-if="pagedItems.length"
      >
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue';
import UserItem from '~/components/UserItem.vue';
import SkeletonUser from '~/components/SkeletonUser.vue';
import '~/assets/scss/users.scss';
import { debounce } from "lodash";

export default {
  layout: 'default',
  components: { Sidebar, UserItem, SkeletonUser },
  data() {
    return {
      loading: true,
      allUsers: [],
      phone: '',
      selectedCities: [],
      citiesList: [],
      page: 1,
      perPage: 50,
      sidebarCollapsed: true,
    };
  },
  computed: {
    filtered() {
      const phone = (this.phone || '').trim().toLowerCase();
      return this.allUsers.filter(user => {
        const inSearch = !phone
            || (user.name && user.name.toLowerCase().includes(phone))
            || (user.phone && user.phone.toLowerCase().includes(phone));
        const inCity = !this.selectedCities.length || this.selectedCities.includes(user.city.id);
        return inSearch && inCity;
      });
    },
    pageCount() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
    },
    pagedItems() {
      const start = (this.page - 1) * this.perPage;
      return this.filtered.slice(start, start + this.perPage);
    },
    isDark() {
      return this.$vuetify.theme.dark;
    },
    textColor() {
      return this.isDark ? '#FFF' : '#222';
    }
  },

  watch: {
    perPage() {
      this.page = 1;
    },
    selectedCities() {
      this.page = 1;
    }
  },

  methods: {
    onSearch: debounce(function() {
      this.page = 1;
    }, 300),
    openUser(user) {
      this.$router.push({ name: 'user-id', params: { id: user.id } }).catch(()=>{});
    },
    openCity(city) {
      this.selectedCities = [city.id];
    },

    async loadAllUsersSimulated() {
      this.loading = true;
      this.allUsers = [];
      const totalToLoad = 8000;
      let offset = 0;
      let nextLimit = 100;
      while (offset < totalToLoad) {
        if (offset > 0) nextLimit = 1000;
        if (offset + nextLimit > totalToLoad) nextLimit = totalToLoad - offset;
        try {
          const { items } = await this.$api.users.list({ offset, limit: nextLimit });
          this.allUsers.push(...items);
          offset += items.length;
        } catch (e) {
          console.error('API error', e);
          break;
        }
      }
      const mapCities = {};
      this.allUsers.forEach(u => { if (u.city && u.city.id) mapCities[u.city.id] = u.city; });
      this.citiesList = Object.values(mapCities);
      this.loading = false;
    },
    async refresh() {
      await this.loadAllUsersSimulated();
    },
  },
  async mounted() {
    await this.loadAllUsersSimulated();
  }
};
</script>

<style scoped>
</style>
