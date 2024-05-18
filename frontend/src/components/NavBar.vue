<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <a class="navbar-brand" href="#">{{
        isUpperCase ? BrandName.toUpperCase() : BrandName
      }}</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Books</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      BrandName: "Bostorek",
      isUpperCase: true,
    };
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #063547;
  padding: 15px 0;
}

.navbar-brand {
  padding: 0;
  margin: 0;
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
}

.nav-link {
  padding: 10px 25px;
  color: #ffffff;
  text-align: center;
}
</style>
