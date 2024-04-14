<template>

    <head>
        <title>Remindwords - Daily word</title>
    </head>

    <Background />
    <main class="w-[70%] mx-auto">
        <Header />

        <section class="h-[70vh] flex flex-col justify-center items-center gap-6">
            <h1 class="uppercase font-bold text-2xl">Adivina esta palabra</h1>
            <p class="text-xl text-[#964D98] font-medium">{{ word }}</p>
            <form @submit.prevent="addWord" class="py-2 px-3 rounded-md bg-white/25 flex justify-between items-center">
                <input v-model="response" type="text" class="w-[90%] h-full bg-transparent outline-none"
                    placeholder="Meaning" autofocus />
                <button class="bg-white size-8 rounded-md flex justify-center items-center group">
                    <SendIcon
                        class="transform group-hover:-rotate-45 group-hover:scale-110 group-hover:text-[#d66bd1] transition duration-300 size-5" />
                </button>
            </form>
            <button @click="changeRandomWord"
                class="border-2 font-medium border-white flex justify-center items-center gap-2 px-4 py-1 rounded-md bg-gradient-to-r from-cyan-200 to-purple-200 
                hover:to-cyan-200 transition-all duration-300">Otra
                palabra
                <RotateIcon class="size-6" />
            </button>
            <p class="text-xl text-[#964D98] font-medium" v-if="fetchResponse">{{ fetchResponse }}</p>
        </section>
    </main>
</template>

<script>
import { useStore } from '@/stores/counter';
import { computed } from 'vue';
import axios from 'axios';

export default {

    data() {
        return {
            words: [],
            word: '',
            goodAnsweres: [],
            userAnswere: '',
            fetchResponse: {},
        };
    },
    methods: {
        setRandomWord() {
            if (this.words.length == 0) {
                this.word = 'No hay palabras';
            } else {
                this.word = this.words[Math.floor(Math.random() * this.words.length)];
                this.filterFetchResponse();
            }
        },

        changeRandomWord() {
            if (this.words.length > 1) {
                let newWord;
                do {
                    newWord = this.words[Math.floor(Math.random() * this.words.length)];
                } while (newWord === this.word);
                this.word = newWord;
                this.filterFetchResponse();

            } else if (!this.words.length) {
                alert('No hay palabras');
            } else if (this.words.length == 1) {
                alert('Solo hay una palabra');
            }
        },

        checkAnswere() {
            if (this.userAnswere === this.goodAnswere) {
                alert('Correcto');
            } else {
                alert('Incorrecto');
            }
        },

        filterFetchResponse() {
            this.fetchTranslate();

        },

        async fetchTranslate() {
            const data = new URLSearchParams();
            data.set('from', 'es');
            data.set('to', 'en');
            data.set('text', this.word);

            const headers = {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'a8765e05femsha073d3056235332p1971b0jsnf31f19a1e1e4',
                'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
            };

            try {
                const response = await axios.post('https://google-translate113.p.rapidapi.com/api/v1/translator/text', data, { headers });
                console.log(response.data);
                this.fetchResponse = response.data;
                console.log(this.fetchResponse);
            } catch (error) {
                console.error(error);
            }
        }
    },
    created() {
        const store = useStore();
        this.words = computed(() => store.words);
        this.setRandomWord();
    },
}
</script>