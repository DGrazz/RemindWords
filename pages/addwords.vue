<template>

  <head>
    <title>Remindwords - Add words</title>
  </head>

  <Background />
  <main class="w-[70%] mx-auto">
    <Header />

    <section class="w-full h-[70vh] flex flex-col justify-center items-center gap-8">
      <article class="w-1/3 flex flex-col gap-4 justify-start items-start">
        <h2 class="font-medium text-2xl">Add new words</h2>
        <div class="w-full flex flex-col gap-1 items-start justify-center">
          <p class="text-xs text-[#676767] font-medium">
            (Separa las diferentes palabras con comas)
          </p>
          <form @submit.prevent="addWord"
            class="w-full py-2 px-3 rounded-md bg-white/25 flex justify-between items-center">
            <input v-model="word" type="text" class="w-[90%] h-full bg-transparent outline-none" placeholder="Add words"
              autofocus />
            <button class="bg-white size-8 rounded-md flex justify-center items-center group">
              <PlusIcon
                class="transform group-hover:rotate-90 group-hover:scale-110 group-hover:text-[#d66bd1] transition duration-300 size-5" />
            </button>
          </form>
        </div>
      </article>

      <article
        class="w-1/3 min-h-40 py-2 px-3 rounded-md flex flex-col items-start justify-start border-2 border-white bg-white/15">
        <h3 class="font-medium text-xl flex gap-3 items-center">Added words <button @click="toggleEditWords"
            :class="{'bg-red-400 p-1 rounded-md hover:bg-red-500 transition duration-200': true, 'bg-green-400 hover:bg-green-500':editWords}">
            <EditIcon v-if="!editWords" class="size-4" />
            <CheckIcon v-else class="size-4" />
          </button></h3>
        <p :class="{'flex w-full flex-wrap gap-1': true, 'gap-3 mt-2':editWords}">
          <span v-for="word in words" v-if="!editWords" class="text-[#464646] text-base">{{ word }}, </span>
          <span v-for="(word, index) in words" v-if="editWords"
            class="text-[#464646] text-sm bg-white rounded px-3 py-1 relative shake">{{ word }}
            <button @click="removeWord(index)" class="absolute -top-1 -right-1 bg-red-500 rounded-full p-[2px]">
              <CrossIcon class="size-3 text-black" />
            </button> </span>
        </p>
      </article>
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
      editWords: false,
    };
  },
  methods: {
    addWord() {
      const store = useStore();

      if (this.word) {
        if (/^[a-zA-Z]+$/.test(this.word) && this.word.length >= 2) {
          this.word = this.capitalizeFirstLetter(this.word);

          this.words.push(this.word);
          store.words = this.words;
          console.log('Adding word');

          this.word = '';
        } else {
          alert('Please add a valid word');
        }
      } else {
        alert('Please add a word');
      }
    },
    capitalizeFirstLetter(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    toggleEditWords() {
      this.editWords = !this.editWords;
      if (this.editWords) {
        alert('Editing words');
      } else {
        alert('Done editing words');
      }
    },
    removeWord(index) {
      this.words.splice(index, 1);
      console.log('Word removed');
    },
  },
  created() {
    const store = useStore();
    this.words = computed(() => store.words);
  },
}
</script>

<style>
  @keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-.5px) rotate(-2deg); }
  50% { transform: translateX(.5px) rotate(2deg); }
  75% { transform: translateX(-.5px) rotate(-2deg); }
  100% { transform: translateX(.5px) rotate(2deg); }
}

.shake {
  animation: shake 0.5s infinite;
}

</style>