<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li
        class="page-item"
        :class="{ disabled: current === 1 }"
        v-on:click="goToPage(current - 1)"
      >
        <a class="page-link">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === current }"
        v-for="(page, index) in pages"
        :key="index"
        @click="goToPage(page)"
      >
        <a class="page-link">{{ page }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: current === pages }"
        @click="goToPage(current + 1)"
      >
        <a class="page-link">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  emits: ["changePage"],
  props: {
    current: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit("changePage", pageNumber);
    },
  },
};
</script>

<style scoped>
.pagination li {
  cursor: pointer;
}

.pagination li.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.active > .page-link {
  background-color: #063547 !important;
  border-color: #063547 !important;
}
</style>
