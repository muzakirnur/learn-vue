<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "../../api";
const router = useRouter();

/* State */
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const errors = ref("");

const storeUsers = async () => {
  let formData = new FormData();

  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("password_confirmation", password_confirmation.value);

  /* Storing Data */
  await Api.post("/api/users/create", formData)
    .then(() => {
      router.push("/users");
    })
    .catch((error) => {
      errors.value = error.response.data;
      Swal.fire({
        title: "Gagal !",
        icon: "error",
        text: error.message,
      });
    });
};
</script>

<template>
  <div class="w-full">
    <div class="w-1/2 p-2 mx-auto mb-8">
      <h1 class="font-semibold text-lg">Tambah User</h1>
      <hr />
    </div>
    <div class="w-1/2 p-2 mx-auto">
      <form @submit.prevent="storeUsers()">
        <div class="mb-4 p-2">
          <label for="name" class="text-base">Name</label>
          <input
            v-model="name"
            class="block w-full rounded-md border-0 py-1.5 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="name"
            id="name"
            placeholder="Input Name..."
          />
          <div class="p-4 bg-red-100 mt-4 rounded-lg" v-if="errors.name">
            <span class="text-red-500">{{ errors.name[0] }}</span>
          </div>
        </div>
        <div class="mb-4 p-2">
          <label for="email" class="text-base">Email</label>
          <input
            v-model="email"
            class="block w-full rounded-md border-0 py-1.5 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
            name="email"
            id="email"
            placeholder="Email.."
          />
          <div class="p-4 bg-red-100 mt-4 rounded-lg" v-if="errors.email">
            <span class="text-red-500">{{ errors.email[0] }}</span>
          </div>
        </div>
        <div class="flex flex-wrap justify-between">
          <div class="mb-4 w-1/2 p-2">
            <label for="password" class="text-base">Password</label>
            <input
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div class="p-4 bg-red-100 mt-4 rounded-lg" v-if="errors.password">
              <span class="text-red-500">{{ errors.password[0] }}</span>
            </div>
          </div>
          <div class="mb-4 w-1/2 p-2">
            <label for="password" class="text-base"
              >Password Confirmation</label
            >
            <input
              v-model="password_confirmation"
              class="block w-full rounded-md border-0 py-1.5 p-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="password"
              name="password"
              id="password_confirmation"
              placeholder="Confirm Password"
            />
            <div
              class="p-4 bg-red-100 mt-4 rounded-lg"
              v-if="errors.password_confirmation"
            >
              <span class="text-red-500">{{
                errors.password_confirmation[0]
              }}</span>
            </div>
          </div>
          <div class="flex flex-wrap justify-between">
            <div class="w-1/2 text-end">
              <button
                class="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg shadow-sm transition duration-300 ease-in-out text-white text-end"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
