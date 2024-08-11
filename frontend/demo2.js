let obj = {
  a: 4,
  b: 12,
  calculateSum: function () {
    return this.a + this.b;
  },
};

console.log(obj.calculateSum(), "Sum");

obj.a = 10;

console.log(obj.calculateSum(), "Sum2");
