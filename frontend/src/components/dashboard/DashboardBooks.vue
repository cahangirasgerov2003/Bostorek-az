<template>
  <div>
    <!-- Button -->
    <div class="row mb-4 mt-1 d-flex justify-content-end">
      <div class="col-lg-2 col-5">
        <button
          type="button"
          class="btn btn-primary btn-primary-custom w-100"
          @click="modal.show()"
        >
          Add Book
        </button>
      </div>
    </div>

    <!-- Table -->
    <DashboardBooksTable />

    <!-- Modal -->
    <div class="modal fade" tabindex="-1" ref="addEditBook">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">Add Book</h5>
            <font-awesome-icon
              icon="xmark"
              size="xl"
              @click="modal.hide()"
              class="closeIcon"
            />
          </div>
          <div class="modal-body mx-5">
            <div class="col mb-3">
              <label for="title" class="form-label"
                >Title
                <span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" id="title" required />
            </div>
            <div class="col mb-3">
              <label for="author" class="form-label"
                >Author
                <span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" id="author" required />
            </div>
            <div class="col mb-3">
              <label for="description" class="form-label"
                >Description
                <span class="text-danger">*</span>
              </label>
              <textarea
                id="description"
                class="form-control"
                rows="6"
                maxlength="100"
                minlength="10"
              ></textarea>
            </div>
            <div class="col mb-3">
              <label for="numOfPages" class="form-label"
                >Number of Pages
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="numOfPages"
                required
              />
            </div>
            <div
              class="row d-flex justify-content-end"
              style="padding: 0px 10px"
            >
              <button
                type="button"
                class="btn btn-warning col-sm-4"
                @click="modal.hide()"
              >
                Close
              </button>
              <button type="button" class="btn btn-success col-sm-4 saveButton">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardBooksTable from "./DashboardBooksTable.vue";
import { Modal } from "bootstrap";
export default {
  name: "DashboardBooks",
  data() {
    return {
      modal: null,
    };
  },
  components: {
    DashboardBooksTable,
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditBook);
  },
};
</script>

<style scoped>
.modal-content {
  background-color: var(--secondary-color);
  border: 2px solid var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
}

.closeIcon {
  cursor: pointer;
  color: var(--primary-color);
  transition: all 0.5s;
}

.closeIcon:hover {
  color: red;
}

.saveButton {
  margin-left: 12px;
}

@media only screen and (max-width: 575px) {
  .saveButton {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
