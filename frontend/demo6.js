import { ref, computed } from "vue";

let user = ref({
  name: "Cahangir",
  age: 21,
});

let sayAbout = computed(
  () => `My name is ${user.value.name} and i'm ${user.value.age} years old`
);

console.log("About me: ", sayAbout.value);

user.value.name = "Kamran";

user.value.age = "20";

console.log("About me: ", sayAbout.value);
