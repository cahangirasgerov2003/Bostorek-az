<template>
  <section class="calculatingHeightSection">
    <div class="container">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">Login</h2>
      </div>
      <form @submit.prevent="submitForm">
        <!-- Email -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="email" class="form-label labelElement">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model.trim="userData.email"
              placeholder="Ali2005@gmail.com"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="password" class="form-label labelElement"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="userData.password"
              placeholder="Ali2005%))"
              required
            />
          </div>
        </div>

        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <button type="submit" class="btn btn-primary w-100 py-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Login data : ", this.userData);
    },
  },
};
</script>

<style scoped></style>
