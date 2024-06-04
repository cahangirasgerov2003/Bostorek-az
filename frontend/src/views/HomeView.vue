<template>
  <section class="calculatingHeightSection">
    <TheCarusel v-bind:caruselItems="carouselItems"></TheCarusel>
  </section>
</template>

<script>
import TheCarusel from "../components/widgets/TheCarusel.vue";
import hero_1 from "@/assets/images/hero-1.jpg";
import hero_2 from "@/assets/images/hero-2.jpg";
import hero_3 from "@/assets/images/hero-3.jpg";
export default {
  name: "HomeView",
  components: {
    TheCarusel,
  },
  data() {
    return {
      carouselItems: [
        {
          imageUrl: hero_1,
          subtitle: "Liberte",
          title: "Lorem Ipsum Dolor Sit Amet",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          imageUrl: hero_2,
          subtitle: "Egalite",
          title: "Excepteur Sint Occaecat Cupidatat",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          imageUrl: hero_3,
          subtitle: "Fraternite",
          title: "Neque Porro Quisquam Est",
          description:
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
