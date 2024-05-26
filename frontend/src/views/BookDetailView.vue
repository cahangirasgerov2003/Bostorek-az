<template>
  <section class="mb-5">
    <div class="container pt-5">
      <Heading :title="title" :desc="desc + ' ' + book.name" />
      <RouterLink to="/books" class="btn btn-info px-4 mt-3 mb-5 text-white">
        <font-awesome-icon icon="left-long" size="xl" />
      </RouterLink>
      <div class="row">
        <div class="col-lg-6">
          <img
            src="../../template/bostorek/images/best-books.jpg"
            alt="Best book"
            class="editImage"
          />
        </div>
        <div class="col-lg-6">
          <div class="textOverflow" style="margin-bottom: 30px">
            <p class="lead mb-0 pe-3" style="text-align: justify">
              {{ book.description }}
            </p>
          </div>
          <div>
            <div class="row mb-3 bookStatic">
              <div class="col-lg-6">
                <strong>Page</strong>
              </div>
              <div class="col-lg-6">
                <p>{{ book.page }}</p>
              </div>
            </div>
            <div class="row mb-3 bookStatic">
              <div class="col-lg-6">
                <strong>Category</strong>
              </div>
              <div class="col-lg-6">
                <p>Fiction</p>
              </div>
            </div>
            <div class="row mb-3 bookStatic">
              <div class="col-lg-6">
                <strong>Rating</strong>
              </div>
              <div class="col-lg-6">
                <p>{{ book.rating }}</p>
              </div>
            </div>
            <div class="row mb-3 bookStatic">
              <div class="col-lg-6">
                <strong>Upload date</strong>
              </div>
              <div class="col-lg-6">
                <p>{{ book.uploadDate }}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="my-3 ps-1" style="color: #063547; font-weight: 400">
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
                        class="d-flex align-items-center justify-content-end"
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-thumbs-up"
                          size="lg"
                        />
                        <strong class="ms-2">8</strong>
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
                      </p>
                      <div
                        class="d-flex align-items-center justify-content-end"
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-thumbs-up"
                          size="lg"
                        />
                        <strong class="ms-2">89</strong>
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
                        class="d-flex align-items-center justify-content-end"
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-thumbs-up"
                          size="lg"
                        />
                        <strong class="ms-2">12</strong>
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
      </div>
    </div>
  </section>
</template>

<script>
import Heading from "@/components/Heading.vue";
import { RouterLink } from "vue-router";
import books from "@/data/db.js";
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
    Heading,
    RouterLink,
  },
  created() {
    const bookId = this.$route.params.id;
    this.book = books.find((book) => book.id === parseInt(bookId));
  },
};
</script>

<style scoped>
.editImage {
  width: 100%;
  height: 740px;
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
  max-height: 96px;
  overflow-y: auto;
  text-align: justify;
  padding-right: 8px;
}
</style>
