<template>
  <div>
    <section>
      <TheCarusel
        v-bind:caruselItems="carouselItems"
        height="400px"
      ></TheCarusel>
    </section>
    <section class="my-5">
      <div class="container">
        <TheHeading :desc="desc" :title="title" />
        <div class="row mt-5">
          <div class="col-md-4">
            <FeaturedListGroup />
          </div>
          <div class="col-md-8">
            <FeaturedAccordion />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import hero_1 from "@/assets/images/hero-1.jpg";
import hero_2 from "@/assets/images/hero-2.jpg";
import hero_3 from "@/assets/images/hero-3.jpg";
import TheHeading from "../components/TheHeading.vue";
import TheCarusel from "../components/widgets/TheCarusel.vue";
import FeaturedListGroup from "../components/widgets/FeaturedListGroup.vue";
import FeaturedAccordion from "../components/widgets/FeaturedAccordion.vue";
export default {
  name: "HomeView",
  components: {
    TheCarusel,
    TheHeading,
    FeaturedListGroup,
    FeaturedAccordion,
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
      title: "Featured books",
      desc: "After the title and the book cover, your description is the most important",
    };
  },
};
</script>

<style scoped></style>
