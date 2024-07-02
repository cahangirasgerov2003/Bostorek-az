<template>
  <!-- Table -->
  <div class="row">
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
          <tr>
            <td>Gülün Adi</td>
            <td>Umberto Eco</td>
            <td class="bookDesc">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.Sed ut perspiciatis unde omnis
              iste natus error sit voluptatem accusantium doloremque
              laudantium.Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium.Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </td>
            <td>217</td>
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
