import { ref } from "vue";
let a = ref(21);

let b = ref(12);

console.log(a, "a");

console.log(a.value + b.value, "Sum");

a.value = 100;

console.log(a.value + b.value, "Sum");
