<script setup>
/* Import ref and Mounted */
import { ref, onMounted } from "vue";
/* Import Api */
import Api from "../../api";
/* Define State */
const users = ref([]);
const no = 1;
/* Fetch data */
const fetchDataUsers = async () => {
  /* fetching data from api */
  await Api.get("/api/users").then((response) => {
    users.value = response.data.data;
  });
};

onMounted(() => {
  fetchDataUsers();
});

function deleteUsers(id) {
  Api.post("/api/users/delete", { id: id }).then((response) => {
    Swal.fire({
      title: "Success!",
      text: "User Deleted!",
      icon: "success",
    });
  });
}
</script>

<template>
  <div class="w-1/2 mx-auto">
    <table class="table-fixed p-2 mx-auto">
      <thead>
        <th class="p-2 text-left bg-slate-200">No</th>
        <th class="p-2 text-center bg-slate-200">Name</th>
        <th class="p-2 text-center bg-slate-200">Email</th>
        <th class="p-2 text-right bg-slate-200">Action</th>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td class="p-2 text-left">{{ no++ }}</td>
          <td class="p-2 text-center">{{ user.name }}</td>
          <td class="p-2 text-center">{{ user.email }}</td>
          <td class="p-2 text-center">
            <button
              class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              @click="deleteUsers(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
