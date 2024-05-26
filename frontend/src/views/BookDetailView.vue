<template>
  <section class="mb-5">
    <div class="container pt-5">
      <Heading :title="title" :desc="desc" />
      <RouterLink to="/books" class="btn btn-info px-4 mt-3 mb-5 text-white">
        Back
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
          <div>
            <p class="lead">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              quaerat voluptates eum accusamus, architecto repellendus unde
              corrupti ab magnam modi?
            </p>
          </div>
          <div>
            <div class="row border-bottom mb-3">
              <div class="col-lg-6">
                <strong>Page</strong>
              </div>
              <div class="col-lg-6">
                <p>278</p>
              </div>
            </div>
            <div class="row border-bottom mb-3">
              <div class="col-lg-6">
                <strong>Category</strong>
              </div>
              <div class="col-lg-6">
                <p>Fiction</p>
              </div>
            </div>
            <div class="row border-bottom mb-3">
              <div class="col-lg-6">
                <strong>Rating</strong>
              </div>
              <div class="col-lg-6">
                <p>7.8</p>
              </div>
            </div>
            <div class="row border-bottom mb-3">
              <div class="col-lg-6">
                <strong>Upload date</strong>
              </div>
              <div class="col-lg-6">
                <p>20 Jan 2010</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="my-3" style="color: #063547; font-weight: 400">
              Comments
            </h3>
            <div
              id="carouselExampleAutoplaying"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="card">
                    <div class="card-header fst-italic fw-bold">John doe</div>
                    <div class="card-body">
                      <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.With supporting text below as a
                        natural lead-in to additional content.With supporting
                        text below as a natural lead-in to additional content.
                      </p>
                      <div class="d-flex">
                        <p>Upvote :</p>
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
                        natural lead-in to additional content.With supporting
                        text below as a natural lead-in to additional content.
                      </p>
                      <div class="d-flex">
                        <p>Upvote :</p>
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
                        natural lead-in to additional content.With supporting
                        text below as a natural lead-in to additional content.
                      </p>
                      <div class="d-flex">
                        <p>Upvote :</p>
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
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
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
export default {
  name: "BookDetailView",
  data() {
    return {
      title: "Book Detail",
      desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
    };
  },
  components: {
    Heading,
    RouterLink,
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
</style>
