<template>
  <section class="calculatingHeightSectionBasic">
    <ContactUsForm />
    <ContactUsFooter />
  </section>
</template>

<script>
import ContactUsForm from "@/components/contactUs/ContactUsForm.vue";
import ContactUsFooter from "@/components/contactUs/ContactUsFooter.vue";
export default {
  name: "ContactView",
  data() {
    return {};
  },
  components: {
    ContactUsForm,
    ContactUsFooter,
  },
};
</script>

<style scoped></style>
