<template>
  <div class="list-group">
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{ active: filterType === 'Latest' }"
      @click="changeFilterType('Latest')"
    >
      The Latest
    </button>
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{ active: filterType === 'TopRated' }"
      @click="changeFilterType('TopRated')"
    >
      Top Rated
    </button>
  </div>
</template>
<script>
export default {
  name: "FeaturedListGroup",
  emits: ["changeType"],
  data() {
    return {};
  },
  props: {
    filterType: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeFilterType(filterType) {
      this.$emit("changeType", filterType);
    },
  },
};
</script>
<style scoped>
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>
