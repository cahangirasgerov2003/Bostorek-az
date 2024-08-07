<template>
  <div>
    <h3 class="mb-3 ps-1" style="color: var(--primary-color); font-weight: 400">
      Comment section
    </h3>
    <div class="boxStyle" v-if="!userAlreadyCommented && !isLoading">
      <form @submit.prevent="addNewComment()">
        <!-- Rating Input -->
        <div>
          <label
            for="comment"
            style="color: var(--primary-color)"
            class="form-label labelStyle"
            >Comment The Book</label
          >
          <textarea
            id="comment"
            class="form-control commentArea"
            rows="4"
            maxlength="400"
            placeholder="Enter your comment"
            autocomplete="off"
            v-model="comment"
          ></textarea>
        </div>

        <div class="mt-1 ms-1">
          <small v-if="commentError" class="text-danger">{{
            commentError
          }}</small>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary btn-primary-custom buttonStyle"
        >
          Comment
        </button>
      </form>
    </div>
    <div v-if="!isLoading && userAlreadyCommented" class="boxStyle col-lg-6">
      <div class="fs-5 fw-bold">Your comment</div>
      <div class="ms-1 mt-2">{{ userComment }}</div>
    </div>

    <div
      v-if="isLoading"
      class="boxStyle col-lg-6 d-flex align-items-center justify-content-center"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        spin
        size="lg"
        style="color: var(--primary-color)"
      />
    </div>
  </div>
</template>

<script>
import { successAction } from "@/utility/index.js";
import { mapActions, mapState } from "pinia";
import { useCommentStore } from "@/stores/commentStore.js";
import { useAuthStore } from "@/stores/authStore.js";

export default {
  name: "AddCommentSection",
  data() {
    return {
      comment: "",
      commentError: "",
    };
  },
  props: {
    getParamsId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useCommentStore, ["createNewComment"]),
    async addNewComment() {
      try {
        if (this.comment.length > 400 || this.comment.length < 1) {
          this.commentError =
            "Comment length cannot exceed 400 characters or be empty !";
          return;
        }
        this.commentError = "";

        const result = await this.createNewComment({
          content: this.comment,
          commentedBy: this.user._id,
          reviewedBook: this.getParamsId,
        });
        successAction(result);
      } catch (errorData) {
        console.error(
          "Error occurred when new comment was created !",
          errorData
        );

        this.commentError =
          errorData.error || "Error occurred when new comment was created !";
      } finally {
        this.comment = "";
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useCommentStore, ["commentsForBook", "isLoading"]),
    userAlreadyCommented() {
      if (!this.user) {
        return false;
      }

      return this.commentsForBook.some(
        (comment) => comment.commentedBy._id === this.user._id
      );
    },

    userComment() {
      const userCommentObj = this.commentsForBook.find(
        (comment) => comment.commentedBy._id === this.user._id
      );

      return userCommentObj.content;
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border: 1px solid #dee2e6;
}

.commentArea {
  background-color: #f1f1f1;
  color: #101010;
  padding-left: 25px;
}
</style>
