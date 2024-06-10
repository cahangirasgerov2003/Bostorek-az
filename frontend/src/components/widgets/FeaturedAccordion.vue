<template>
  <div class="accordion" id="accordionExample">
    <div
      class="accordion-item"
      v-for="(item, index) in filterBooks"
      :key="index"
    >
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          :class="{ collapsed: openAccordionIndex !== index }"
          @click="toggleAccordion(index)"
        >
          <h2 class="fs-6 fw-bold fst-italic mb-0">
            {{ item.title }} - {{ item.author }}
          </h2>
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ show: openAccordionIndex === index }"
      >
        <div class="accordion-body">
          <div class="row">
            <div class="col-md-4">
              <img
                :alt="item.title"
                src="../../assets/images/b1.jpg"
                class="img-fluid rounded-5"
              />
            </div>
            <div class="col-md-8 d-flex flex-column justify-content-center">
              <div class="mb-3">
                {{ item.description }}
              </div>
              <div class="d-flex">
                <strong class="me-3">Rating of the book :</strong>
                <div
                  class="position-relative"
                  style="padding-top: 1px; padding-right: 3px"
                >
                  {{ item.rating }}
                  <span
                    class="position-absolute top-0 start-100 translate-middle border border-light rounded-circle"
                    :class="
                      item.rating > 6.6
                        ? 'bg-success'
                        : item.rating > 3.3
                        ? 'bg-warning'
                        : 'bg-danger'
                    "
                    style="padding: 6px"
                  >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FeaturedAccordion",
  data() {
    return {
      openAccordionIndex: 0,
    };
  },
  props: {
    filterBooks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleAccordion(index) {
      if (this.openAccordionIndex !== index) {
        this.openAccordionIndex = index;
      } else {
        this.openAccordionIndex = -1;
      }
    },
  },
};
</script>
<style scoped>
.accordion-button:not(.collapsed) {
  background-color: var(--secondary-color);
  color: white;
}

.accordion-button:focus {
  outline: 0;
  box-shadow: none;
}
</style>
