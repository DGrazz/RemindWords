import { defineStore } from "pinia";

export const useStore = defineStore("counter",{
    state: () => ({
        words: [],
    }),
    persist: {
        storage: persistedState.localStorage,
        paths:['words']
    },
    actions: {
    },
});
