import { defineStore } from "pinia";

export const useAuthStore = defineStore("users", {
  state: () => {
    return { user: undefined, admin: undefined };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setUser(payload) {
      this.user = payload;
    },

    setAdmin(payload) {
      this.admin = payload;
    },
  },
});
