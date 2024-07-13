<template>
  <!-- Table -->
  <div class="row mb-4">
    <div class="col table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Page</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody style="position: relative">
          <tr v-for="(book, index) in books" :key="index">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td class="bookDesc">
              {{ book.description }}
            </td>
            <td>{{ book.page }}</td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardBooksTable",
  data() {
    return {};
  },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
th,
td {
  padding: 20px 16px;
}

.bookDesc {
  max-width: 250px;
  text-align: justify;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bookDesc:hover {
  white-space: wrap;
  overflow: visible;
}
</style>
