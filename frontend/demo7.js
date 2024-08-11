import { computed, reactive } from "vue";

let user = reactive({
  name: "Cahangir",
  age: 21,
});

let sayAbout = computed(
  () => `My name is ${user.name} and i'm ${user.age} years old`
);

console.log("About me: ", sayAbout.value);

user.name = "Kamran";

user.age = "20";

console.log("About me: ", sayAbout.value);
