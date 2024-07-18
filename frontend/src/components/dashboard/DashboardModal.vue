<template>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="modal-title">{{ modalTitle }}</h5>
        <font-awesome-icon
          icon="xmark"
          size="xl"
          @click="modalHide()"
          class="closeIcon"
        />
      </div>
      <div class="modal-body mx-5">
        <div class="col d-flex justify-content-center mb-3" v-if="errorContent">
          <div class="text-center">
            <span class="text-danger" style="font-weight: 800">{{
              errorContent
            }}</span>
          </div>
        </div>
        <div class="col mb-3">
          <label for="title" class="form-label"
            >Title
            <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="bookData.title"
            autocomplete="off"
            required
          />
          <small v-if="errors.title.errorMessage" class="text-danger">{{
            errors.title.errorMessage
          }}</small>
        </div>
        <div class="col mb-3">
          <label for="author" class="form-label"
            >Author
            <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="author"
            autocomplete="off"
            v-model.trim="bookData.author"
            required
          />
          <small v-if="errors.author.errorMessage" class="text-danger">{{
            errors.author.errorMessage
          }}</small>
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
            v-model.trim="bookData.description"
            autocomplete="off"
            required
          ></textarea>
          <small v-if="errors.description.errorMessage" class="text-danger">{{
            errors.description.errorMessage
          }}</small>
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
            v-model.trim="bookData.page"
            autocomplete="off"
            min="1"
            required
          />
          <small v-if="errors.page.errorMessage" class="text-danger">{{
            errors.page.errorMessage
          }}</small>
        </div>
        <div class="row d-flex justify-content-end" style="padding: 0px 10px">
          <button
            type="button"
            class="btn btn-warning col-sm-4"
            @click="modalHide()"
          >
            Close
          </button>
          <button
            @click="saveBookDetails()"
            type="button"
            class="btn btn-success col-sm-4 saveButton"
            v-if="!isLoading"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-success col-sm-4 saveButton"
            v-else
          >
            <font-awesome-icon
              icon="circle-notch"
              spin-pulse
              style="font-size: 20px"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardModal",
  data() {
    return {};
  },
  props: {
    errorContent: {
      type: String,
      required: true,
    },
    modalHide: {
      type: Function,
      required: true,
    },
    bookData: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    saveBookDetails: {
      type: Function,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.closeIcon {
  transition: all 0.5s;
}
</style>
