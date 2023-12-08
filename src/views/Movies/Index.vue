<script setup>
/* Import ref and Mounted */
import { ref, nextTick } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
/* Import Api */
import Api from "../../api/omdb";
/* Define State */
let movies = ref([]);
const search = ref("");
const renderComponent = ref(true);
/* Fetch data */
const getMovies = async () => {
  /* fetching data from api */
  await Api.get("", {
    params: {
      apiKey: "3f2cfc26",
      s: search.value,
      r: "json",
    },
  }).then((response) => {
    movies = response.data["Search"];
    forceRerender();
  });
};

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
};
</script>

<template>
  <div class="w-1/2 mx-auto" v-if="renderComponent">
    <div class="w-full p-4 flex flex-wrap justify-between align-middle">
      <div class="w-1/2">
        <h1 class="font-semibold text-lg">Cari Movies</h1>
      </div>
    </div>
    <hr class="mb-8" />
    <form @submit.prevent="getMovies">
      <div class="flex flex-wrap justify-between">
        <div class="w-4/5 p-2">
          <input
            v-model="search"
            type="text"
            name="t"
            id="t"
            class="block w-full rounded-md border-0 py-1.5 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Cari Film..."
          />
        </div>
        <div class="w-1/5 p-2">
          <ArrowPathIcon
            id="loading"
            class="hidden h-12 w-12 text-indigo-500 animate-spin align-middle p-2rounded-lg"
            aria-hidden="true"
          />
          <button
            id="searchButton"
            type="submit"
            class="bg-indigo-400 hover:bg-indigo-500 rounded-lg shadow-sm w-full p-2 text-white"
          >
            Cari
          </button>
        </div>
      </div>
    </form>
    <div v-if="movies.length == 0" class="p-2 bg-indigo-300 rounded-lg">
      <p class="font-semibold">Tidak Ada Data</p>
    </div>
    <div v-else class="grid grid-cols-3 gap-4">
      <div
        class="w-full flex flex-wrap bg-slate-200 rounded-lg shadow-lg"
        v-for="movie in movies"
      >
        <div id="poster" class="w-1/2 p-2">
          <img
            :src="
              movie['Poster'] == 'N/A'
                ? 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3.jpg'
                : movie['Poster']
            "
            alt="{{ movie['Title'] }}"
            class="h-[800] w-40"
          />
        </div>
        <div id="detail" class="w-1/2">
          <h1 class="font-bold text-lg">{{ movie["Title"] }}</h1>
          <div class="grid grid-cols-3 gap-1">
            <span
              class="inline-flex items-center rounded-md bg-red-600 text-white uppercase px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 mx-auto"
              >{{ movie["Type"] }}</span
            >
            <span
              class="inline-flex items-center rounded-md bg-indigo-600 text-white uppercase px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 mx-auto"
              >{{ movie["Year"] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
