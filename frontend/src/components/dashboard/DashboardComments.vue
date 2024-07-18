<template>
  <div>
    <div class="d-flex justify-content-center mt-5" v-if="isLoading">
      <font-awesome-icon icon="spinner" spin-pulse style="font-size: 40px" />
    </div>

    <div class="row mb-4" v-if="commentsByUser.length !== 0">
      <div class="col table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Book name</th>
              <th>Content</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody
            style="position: relative"
            v-for="(comment, index) in limitBooks"
            :key="index"
          >
            <tr>
              <td>{{ comment.reviewedBook.title }}</td>
              <td class="bookDesc">
                {{ comment.content }}
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="showModal(comment._id, comment.content)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="
                    removeAComment(comment._id, comment.reviewedBook.title)
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="d-flex justify-content-center mb-5"
      v-if="commentsByUser.length === 0 && !isLoading"
    >
      <img
        alt="Not comments"
        src="@/assets/images/notBooks.jpg"
        class="trashStyle"
      />
    </div>

    <ThePagination
      :current="current"
      :pages="calculateNumberOfPages"
      @changePage="updatePage"
    />

    <!-- Edit modal -->
    <div class="modal fade" tabindex="-1" ref="addEditComment">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">Edit</h5>
            <font-awesome-icon
              icon="xmark"
              size="xl"
              class="closeIcon"
              @click="hideModal()"
            />
          </div>
          <div class="modal-body mx-5">
            <div
              class="col d-flex justify-content-center mb-3"
              v-if="errorContent"
            >
              <div class="text-center">
                <span class="text-danger" style="font-weight: 800">{{
                  errorContent
                }}</span>
              </div>
            </div>
            <div class="col">
              <label for="content" class="form-label mb-0"
                >Description
                <span class="text-danger">*</span>
              </label>
              <textarea
                id="content"
                class="form-control"
                rows="4"
                maxlength="400"
                placeholder="Edit your comment"
                autocomplete="off"
                v-model="commentData.content"
                required
              ></textarea>
              <small v-if="errors.content.errorMessage" class="text-danger">{{
                errors.content.errorMessage
              }}</small>
            </div>

            <div
              class="row d-flex justify-content-end"
              style="padding: 0px 10px; margin-top: 30px"
            >
              <button
                type="button"
                class="btn btn-warning col-sm-4"
                @click="hideModal()"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success col-sm-4 saveButton"
                @click="editAComment()"
              >
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
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useCommentStore } from "@/stores/commentStore";
import { useAuthStore } from "@/stores/authStore";
import { warningAction, successAction } from "@/utility";
import { calculateNumberOfPages, limitBooks } from "@/utility/index.js";
import ThePagination from "@/components/ThePagination.vue";
export default {
  name: "DashboardComments",
  data() {
    return {
      commentData: {
        content: "",
      },
      commentId: null,
      current: 1,
      perPage: 6,
      errorContent: "",
      errors: {
        content: {
          errorMessage: "",
        },
      },
    };
  },
  components: {
    ThePagination,
  },
  computed: {
    ...mapState(useCommentStore, ["isLoading", "commentsByUser"]),
    ...mapState(useAuthStore, ["user"]),
    returnUploadedBooks() {
      return this.commentsByUser.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    calculateNumberOfPages() {
      return calculateNumberOfPages(this.commentsByUser, this.perPage);
    },
    limitBooks() {
      return limitBooks(this.current, this.perPage, this.returnUploadedBooks);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditComment);
  },
  created() {
    this.fetchCommentsByUser(this.user._id);
  },
  methods: {
    ...mapActions(useCommentStore, [
      "fetchCommentsByUser",
      "deleteAComment",
      "editTheComment",
    ]),
    async removeAComment(commentId, bookName) {
      console.log(commentId, bookName);
      try {
        await this.deleteAComment(commentId);
        warningAction(`Comment for ${bookName} has been deleted !`);
      } catch (errorData) {
        console.error("Error occurred when comment was deleted !", errorData);
      }
    },

    showModal(commentId, commentContent) {
      this.modal.show();
      this.commentData.content = commentContent;
      this.commentId = commentId;
    },

    async editAComment() {
      try {
        if (
          this.commentData.content.length > 400 ||
          this.commentData.content.length < 1
        ) {
          this.errors.content.errorMessage =
            "Comment cannot exceed 400 characters or empty !";
          return;
        }
        const result = await this.editTheComment(
          this.commentData,
          this.commentId
        );
        console.log("response edit book", result);
        successAction(result);
        this.modal.hide();
      } catch (errorData) {
        console.error("Error occurred when comment was edited !", errorData);
        this.errorContent =
          errorData.error || "Error occurred when new book was edited !";
      }
    },
    updatePage(page) {
      this.current = page;
    },
    hideModal() {
      this.modal.hide();
      this.errors.content.errorMessage = "";
    },
  },
};
</script>

<style scoped>
th,
td {
  padding: 20px 10px;
  white-space: nowrap;
}
textarea.form-control {
  margin-top: 20px;
}

.modal-body {
  padding-bottom: 28px;
}

.closeIcon {
  transition: all 0.5s;
}

.trashStyle {
  width: 50%;
}

@media only screen and (max-width: 991px) {
  .trashStyle {
    width: 80%;
  }
}

@media only screen and (max-width: 575px) {
  .trashStyle {
    width: 100%;
  }
}
</style>
