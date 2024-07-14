<template>
  <!-- <div> -->
  <section :class="{ calculatingHeightSection: !book, 'mb-5 mt-3': book }">
    <div class="container pt-5" v-if="book">
      <TheHeading :title="title" :desc="desc + ' ' + book.title" />
      <RouterLink
        to="/books"
        class="btn px-4 mt-3 mb-5 text-white btn-left-arrow"
      >
        <font-awesome-icon icon="left-long" size="xl" />
      </RouterLink>
      <div class="row">
        <div class="col-lg-6">
          <img
            src="@/assets/images/b2.webp"
            alt="Best book"
            class="editImage"
          />
        </div>
        <div class="col-lg-6">
          <div class="textOverflow" style="margin-bottom: 30px">
            <p class="lead bookDesc">
              {{ book.description }}
            </p>
          </div>
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

          <div class="commentsSection">
            <h3
              class="my-3 ps-1"
              style="color: var(--primary-color); font-weight: 400"
            >
              Comments
            </h3>
            <div
              id="carouselExampleAutoplaying"
              class="carousel slide"
              data-bs-ride="carousel"
              style="width: 90%; margin: auto"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="card">
                    <div class="card-header fst-italic fw-bold">John doe</div>
                    <div class="card-body">
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.With supporting text below as a
                        natural lead-in to additional content.With supporting,
                        natural lead-in to additional content.With supporting,
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <strong class="mr-2">Upvote?</strong>
                        </div>
                        <div>
                          <font-awesome-icon
                            icon="fa-regular fa-thumbs-up"
                            size="lg"
                          />
                          <strong class="ms-2">8</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="card">
                    <div class="card-header fst-italic fw-bold">John doe</div>
                    <div class="card-body">
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.With supporting text below as a
                        natural lead-in to additional content.With supporting,
                        natural lead-in to additional content.With supporting,
                        natural lead-in to additional content.With supporting,
                        With supporting text below as a natural lead-in to
                        additional content.With supporting text below as a
                        natural lead-in to additional content.With supporting,
                        natural lead-in to additional content.With supporting,
                        natural lead-in to additional content.With supporting,
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div>
                          <strong class="mr-2">Upvoted</strong>
                        </div>
                        <div>
                          <font-awesome-icon
                            :icon="['fas', 'thumbs-up']"
                            style="color: var(--secondary-color)"
                            size="lg"
                          />
                          <strong class="ms-2">12</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
                style="height: 32px; width: 20px"
              >
                <font-awesome-icon
                  icon="angle-left"
                  style="color: black"
                  size="2xl"
                  aria-hidden="true"
                />
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
                style="height: 32px; width: 20px"
              >
                <font-awesome-icon
                  icon="angle-right"
                  style="color: black"
                  size="2xl"
                  aria-hidden="true"
                />
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div class="col-12 mt-4">
          <h3
            class="mb-3 ps-1"
            style="color: var(--primary-color); font-weight: 400"
          >
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

        <div class="col-12 my-3">
          <hr style="color: var(--primary-color)" />
        </div>

        <div class="col-12">
          <h3
            class="mb-3 ps-1"
            style="color: var(--primary-color); font-weight: 400"
          >
            Comment section
          </h3>
          <div class="boxStyle">
            <form>
              <!-- Rating Input -->
              <div class="mb-3">
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
                  maxlength="100"
                  placeholder="Enter your comment"
                  autocomplete="off"
                  required
                ></textarea>
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
        </div>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center" v-else>
      <img alt="notFound" src="@/assets/images/notFound.avif" />
    </div>
  </section>
</template>

<script>
import TheHeading from "@/components/TheHeading.vue";
import { RouterLink } from "vue-router";
import { useBookStore } from "../stores/bookStore.js";
import { mapState } from "pinia";
export default {
  name: "BookDetailView",
  data() {
    return {
      title: "Book Detail",
      desc: "About the book of",
      book: null,
    };
  },
  components: {
    TheHeading,
    RouterLink,
  },
  created() {
    // const bookId = this.$route.params.id;
    // this.book = books.find((book) => book.id === parseInt(bookId));

    // Bunu gettersle yazaq
    // this.fetchABook();

    const bookId = this.$route.params.id;

    // console.log(this.selectABook);
    // anlamasan console.log-a bax

    this.book = this.selectABook(bookId);
  },
  methods: {
    // Bu kodu getters kullanaraq yazacagiq
    // async fetchABook() {
    //   const bookId = this.$route.params.id;
    //   try {
    //     const response = await fetch(
    //       `http://localhost:3000/api/v1/books/${bookId}`
    //     );
    //     const book = await response.json();
    //     this.book = book.aBook;
    //     this.loading = false;
    //   } catch (error) {
    //     console.error("An error occurred while fetching a book", error);
    //   }
    // },
  },
  computed: {
    ...mapState(useBookStore, ["selectABook"]),
  },
};
</script>

<style scoped>
.editImage {
  width: 100%;
  height: 745px;
  object-fit: cover;
  border-radius: 5px;
}

.textOverflow {
  max-height: 190px;
  overflow-y: auto;
}

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

.carousel-control-prev {
  top: 50%;
  left: calc(-1% - 20px);
}

.carousel-control-next {
  top: 50%;
  left: 101%;
}

.card-text {
  /* max-height: 96px; */
  height: 96px;
  overflow-y: auto;
  text-align: justify;
  padding-right: 8px;
}

.bookDesc {
  text-align: justify;
  margin-bottom: 0;
  padding-right: 16px;
}

.btn-left-arrow {
  background-color: var(--primary-color);
  transition: all 0.4s;
}
.btn-left-arrow:hover {
  background-color: var(--secondary-color);
}

.boxStyle {
  border: 1px solid #e2e3e5;
  border-radius: 10px;
  padding: 20px;
}

.rateInput,
.commentArea {
  width: 50%;
}

.commentArea {
  background-color: #f1f1f1;
  color: #101010;
  padding-left: 25px;
}

.buttonStyle {
  width: 25%;
  margin-top: 20px;
}

.labelStyle {
  font-size: 20px;
  font-weight: bold;
  margin-left: 4px;
  margin-bottom: 15px;
}

.form-control:focus {
  box-shadow: none;
  border: 1px solid #dee2e6;
}

@media only screen and (max-width: 991px) {
  .bookDesc {
    margin-top: 10px;
    padding-right: 0;
    text-align: center;
  }
  .editImage {
    max-height: 600px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }
  .commentsSection {
    margin-top: 25px;
  }

  .rateInput,
  .commentArea {
    width: 100%;
  }

  .buttonStyle {
    width: 50%;
  }
}

@media only screen and (max-width: 485px) {
  .editImage {
    max-height: 450px;
  }
}
</style>
