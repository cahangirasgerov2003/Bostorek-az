import { ref, computed } from "vue";

let a = ref(21);

let b = ref(20);

let sum = computed(() => a.value + b.value);

console.log(sum.value, "Sum");

a.value = 40;

console.log(sum.value, "Sum2");
