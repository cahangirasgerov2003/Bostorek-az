<template>
  <div class="container">
    <TheHeading :title="title" :desc="desc" />

    <div class="row mt-5">
      <div class="col-md-6">
        <div class="card mb-4 homeCardStyle">
          <div class="card-body">
            <div class="d-flex flex-start align-items-center">
              <img
                class="rounded-circle shadow-1-strong me-3"
                src="@/assets/images/b2.jpg"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <h6 class="fw-bold text-primary mb-1">Book Name</h6>
                <p class="text-muted small mb-0">Author - Jan 2020</p>
              </div>
            </div>

            <p class="mt-3 mb-4 pb-2 homeDescBook">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeading from "@/components/TheHeading.vue";
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
};
</script>
<style scoped>
.homeDescBook {
  text-align: justify;
}

.homeCardStyle {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
