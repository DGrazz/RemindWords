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
            <form @submit.prevent="checkAnswere"
                class="py-2 px-3 rounded-md bg-white/25 flex justify-between items-center">
                <input v-model="userAnswere" type="text" class="w-[90%] h-full bg-transparent outline-none"
                    placeholder="Meaning" autofocus />
                <button class="bg-white size-8 rounded-md flex justify-center items-center group">
                    <SendIcon
                        class="transform group-hover:-rotate-45 group-hover:scale-110 group-hover:text-[#d66bd1] transition duration-300 size-5" />
                </button>
            </form>
            <button @click="changeRandomWord" class="border-2 font-medium border-white flex justify-center items-center gap-2 px-4 py-1 rounded-md bg-gradient-to-r from-cyan-200 to-purple-200 
                hover:to-cyan-200 transition-all duration-300">Otra
                palabra
                <RotateIcon class="size-6" />
            </button>


            <p><span class="text-xl font-bold" v-for="word in goodAnswers">{{ word }}, </span></p>

        </section>

        <transition name="fade">
            <div v-show="showModal"
                class="bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-24 py-20 rounded-lg absolute  space-y-4 shadow-lg">
                <h2 class="text-3xl uppercase font-semibold text-center">Has acertado tu palabra del dia</h2>
                <h3 class="text-xl text-center">¿ Quieres hacer otra palabra ?</h3>
                <div class="flex justify-center items-center gap-4">
                    <button @click="handleYesClick"
                        class="px-8 py-1 font-medium rounded-md border border-[#9542FF] hover:bg-[#9542FF] hover:text-white hover:-translate-y-1 transition duration-200">Si</button>
                    <button @click="showModal = false"
                        class="px-8 py-1 font-medium rounded-md border border-[#FD84FF] hover:bg-[#FD84FF] hover:text-white hover:-translate-y-1 transition duration-200">No</button>
                </div>
            </div>
        </transition>

    </main>
</template>

<script>
import { useStore } from '@/stores/counter';
import { computed } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {

    data() {
        return {
            words: [],
            word: '',
            goodAnswers: [],
            userAnswere: '',
            fetchResponse: {},
            toast: useToast(),
            showModal: false,
        };
    },
    methods: {
        handleYesClick() {
            this.showModal = false;
            this.setRandomWord();
        },
        
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
            let correct = false;

            for (let i = 0; i < this.goodAnswers.length; i++) {
                let userAnswerNormalized = this.userAnswere.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                let goodAnswerNormalized = this.goodAnswers[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (userAnswerNormalized == goodAnswerNormalized) {
                    correct = true;
                    break;
                }
            }

            if (correct) {
                this.userAnswere = '';
                this.toast.success("Palabra correcta", {
                    position: 'top-center',
                    timeout: 2000,
                });

                this.showModal = true;

            } else {
                this.userAnswere = '';
                this.toast.error("Incorrecto", {
                    position: 'top-center',
                    timeout: 2000,
                });
            }
        },

        async filterFetchResponse() {
            await this.fetchTranslate();

            this.goodAnswers = [];
            this.goodAnswers.push(this.fetchResponse.trans);

            if (this.fetchResponse.dict) {
                for (let i = 0; i < this.fetchResponse.dict.length; i++) {
                    for (let j = 0; j < this.fetchResponse.dict[i].terms.length; j++) {
                        let cleanWord = this.fetchResponse.dict[i].terms[j].replace(/[^a-zñáéíóúüA-ZÑÁÉÍÓÚÜ]/g, '');
                        this.goodAnswers.push(cleanWord);
                    }
                }
            }

            this.goodAnswers = Array.from(new Set(this.goodAnswers));

            console.log("Posibles respuestas: " + this.goodAnswers);
        },

        async fetchTranslate() {
            const data = new URLSearchParams();
            data.set('from', 'en');
            data.set('to', 'es');
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


<style>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
</style>