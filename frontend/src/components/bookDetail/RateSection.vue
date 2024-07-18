<template>
  <div class="mt-4">
    <h3 class="mb-3 ps-1" style="color: var(--primary-color); font-weight: 400">
      Rate section
    </h3>
    <div class="boxStyle">
      <form>
        <!-- Rating Input -->
        <div class="mb-3">
          <label
            for="rating"
            style="color: var(--primary-color)"
            class="form-label labelStyle"
            >Rate The Book</label
          >
          <input
            type="number"
            id="rating"
            class="form-control form-control-custom rateInput"
            min="1"
            max="10"
            placeholder="Rate (1-10)"
            autocomplete="off"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary btn-primary-custom buttonStyle"
        >
          Rate
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RateSection",
  data() {
    return {};
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border: 1px solid #dee2e6;
}
</style>
