<template>
  <div class="container">
    <div>
      <TheHeading :title="title" :desc="desc" />

      <div class="row mt-5" v-if="!isLoading && comments">
        <div
          class="col-md-6"
          v-for="(item, index) in limitToFourComments"
          :key="index"
        >
          <div class="card mb-4 homeCardStyle">
            <div class="card-body pt-4">
              <div class="d-flex flex-start align-items-center px-3">
                <img
                  class="rounded-circle me-3 homeAvatarImg"
                  src="@/assets/images/b2.jpg"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 class="fw-bold text-primary mb-1">
                    {{ item.title ? item.title : item.reviewedBook.title }}
                  </h6>
                  <p class="text-muted small mb-0">
                    {{ item.commentedBy.userName }} - {{ item.createdAt }}
                  </p>
                </div>
              </div>

              <p class="my-4 homeDescBook px-3">
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isLoading"
        class="col-12 d-flex align-items-center justify-content-center mt-5"
      >
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          spin
          size="xl"
          style="color: var(--primary-color)"
        />
      </div>
      <div
        class="col-12 alert alert-warning py-4 mb-0"
        v-if="!isLoading && comments.length === 0"
      >
        No comments yet !
      </div>
    </div>
  </div>
</template>
<script>
import TheHeading from "@/components/TheHeading.vue";
import { useCommentStore } from "@/stores/commentStore";
import { useBookStore } from "@/stores/bookStore";
import { mapState } from "pinia";
export default {
  name: "HomeComments",
  data() {
    return {
      title: "Comments books",
      desc: "This section about comments for books",
    };
  },
  components: {
    TheHeading,
  },
  computed: {
    ...mapState(useCommentStore, ["comments", "isLoading"]),
    ...mapState(useBookStore, ["books"]),

    limitToFourComments() {
      const sortedComments = this.comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      const commentsWithTitle = sortedComments.map((comment, index) => {
        if (comment.reviewedBook.title) {
          return comment;
        } else {
          const wantedBook = this.books.find((item, index) => {
            return item._id === comment.reviewedBook;
          });

          return { ...comment, title: wantedBook.title };
        }
      });

      return commentsWithTitle;
    },
  },
};
</script>
<style scoped>
.homeDescBook {
  text-align: justify;
  height: 90px;
  overflow-y: auto;
}

.homeCardStyle {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.homeAvatarImg {
  box-shadow: rgba(0, 0, 0) 0px 5px 8px;
}
</style>
