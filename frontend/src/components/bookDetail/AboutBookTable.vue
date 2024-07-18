<template>
  <div>
    <div class="row mb-3 bookStatic">
      <div class="col-6">
        <strong>Page</strong>
      </div>
      <div class="col-6">
        <p>{{ book.page }}</p>
      </div>
    </div>
    <div class="row mb-3 bookStatic">
      <div class="col-6">
        <strong>Category</strong>
      </div>
      <div class="col-6">
        <p>Fiction</p>
      </div>
    </div>
    <div class="row mb-3 bookStatic">
      <div class="col-6">
        <strong>Rating</strong>
      </div>
      <div class="col-6">
        <p>{{ book.rating }} - (23 rates)</p>
      </div>
    </div>
    <div class="row mb-3 bookStatic">
      <div class="col-6">
        <strong>Upload date</strong>
      </div>
      <div class="col-6">
        <p>{{ book.updatedAt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutBookTable",
  data() {
    return {};
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.bookStatic {
  position: relative;
  padding-bottom: 10px;
}

.bookStatic::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 12px;
  width: calc(100% - 12px);
  border-bottom: 1px solid rgba(195, 192, 192, 0.523);
}
</style>
