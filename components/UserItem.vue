<template>
  <v-card
      class="user-item" flat
  >
    <div
        class="left"
    >
      <div
          class="avatar"
      >
        {{ initials }}
      </div>
      <div
          class="meta"
      >
        <div
            class="name"
        >
          {{ user.name }}
        </div>
        <div
            class="phone"
        >
          {{ user.phone }}
        </div>
        <div
            class="city"
            @click="$emit('city-click', user.city)"
        >
          {{ user.city.title }}
        </div>
      </div>
    </div>
    <div
        class="right"
    >
      <div
          class="balance"
      >
        {{ formatMoney(user.balance) }} ₽
      </div>
      <div
          class="small"
      >
        Накоплено: {{ formatMoney(user.saveTotal) }} ₽
      </div>
      <div
          class="small"
      >
        Потрачено: {{ formatMoney(user.spendTotal) }} ₽
      </div>
      <div
          class="small"
      >
        Был: {{ formatDate(user.lastVisit) }}
      </div>
      <v-btn
          small text
          @click="$emit('open', user)"
      >
        Подробнее
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: { type: Object, required: true }
  },
  computed: {
    initials() {
      return (this.user.name || '').split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();
    }
  },
  methods: {
    formatMoney(n) { return n != null ? n.toLocaleString('ru-RU') : '—'; },
    formatDate(ts) {
      if (!ts) return '—';
      const d = new Date(ts);
      return d.toLocaleString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  }
};
</script>

<style scoped>
.user-item {
  display:flex;
  justify-content:space-between;
  padding:12px;
}
.left {
  display:flex;
  align-items:center;
  gap:12px;
}
.avatar {
  width:48px;
  height:48px;
  border-radius:50%;
  background:#FFD166;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
}
.meta .name {
  font-weight:600;
}
.meta .phone, .meta .city {
  font-size:12px;
  color:#787878;
}
.right {
  text-align:right;
}
</style>
