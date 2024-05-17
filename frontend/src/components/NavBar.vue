<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <a class="navbar-brand" href="#">Bostorek</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Categories</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
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
