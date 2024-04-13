<template>
    <Background />
    <main class="w-[70%] mx-auto">
        <Header />

        <section class="flex flex-col justify-center items-center">
            <h1 class="uppercase font-bold text-2xl">Adivina esta palabra</h1>
            <p class="text-xl text-[#964D98]">{{ word }}</p>
            
            <button @click="changeRandomWord" class="border border-white flex justify-center items-center gap-1  bg-gradient-to-r from-cyan-300 to-purple-400">Otra palabra</button>
        </section>
    </main>
</template>

<script>
import { useStore } from '@/stores/counter';
import { computed } from 'vue';

export default {

    data() {
        return {
            word: '',
            words: [],
        };
    },
    methods: {
        setRandomWord() {
            if (this.words.length == 0) {
                this.word = 'No hay palabras';
            } else {
                this.word = this.words[Math.floor(Math.random() * this.words.length)];
            }
        },

        changeRandomWord() {
            if (this.words.length > 1) {
                let newWord;
                do {
                    newWord = this.words[Math.floor(Math.random() * this.words.length)];
                } while (newWord === this.word);
                this.word = newWord;
            } else {
                alert('Solo hay una palabra');
            }
        },
    },
    created() {
        const store = useStore();
        this.words = computed(() => store.words);
        this.setRandomWord();
    },
}
</script>