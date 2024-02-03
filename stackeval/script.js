function pMod(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor;
}
const rotateArray = (arr, k) => arr.slice(k).concat(arr.slice(0, k));

function duplicateLastN(arr, n) {
  if (n <= 0) {
    return; // Nothing to duplicate if N is zero or negative
  }

  const originalLength = arr.length;

  for (let i = originalLength - n; i < originalLength; i++) {
    arr.push(arr[i]);
  }
}

class StackCalc {
  constructor() {
    this.stack = [];
    this.operations = {
      "+": "add",
      "*": "multiply",
      "-": "negate",
      "/": "invert",
      "^": "pow",
      "%": "modulo",
      "1.": "duplicateOne",
      ".": "duplicate",
      ";": "remove",
      ":": "flip",
      "i": "iota",
      "m": "move",
      "e": "e",
      "pi": "pi",
      "rot": "rotate",
      "rtd": "radToDeg",
      "dtr": "degToRad",
      "sin": "sin",
      "cos": "cos",
      "tan": "tan",
      "asin": "asin",
      "acos": "acos",
      "atan": "atan",
      "round": "round",
      "clear": "clear",
    };
    this.scripts = {
      ".;": ". ;",
      "quadratic": "3 .; / -0.5 * 3 .; 0.5 2 3 .; ^ -4 8 .; 7 .; * * + ^ + * 4 .; / -0.5 * 4 .; 0.5 2 3 .; ^ -4 9 .; 8 .; * * + ^ - + *",
      
    };
  }
  
  // pops two latest values and pushes their sum
  // requires 2 numbers
  add() {
    if (this.stack.length < 2) {return}
    this.stack.push(this.stack.pop() + this.stack.pop())
  }
  
  // pops two latest values and pushes their product
  multiply() {
    if (this.stack.length < 2) {return}
    this.stack.push(this.stack.pop() * this.stack.pop())
  }
  
  // negates last number
  // requires 1 number
  negate() {
    if (this.stack.length < 1) {return}
    this.stack.push(-this.stack.pop());
  }
  
  // inverts last number
  // requires 1 number
  invert() {
    if (this.stack.length < 1) {return}
    this.stack.push(1 / this.stack.pop());
  }
  
  // performs pow on last two numbers
  // requires 2 numbers
  pow() {
    if (this.stack.length < 2) {return}
    this.stack.push(Math.pow(this.stack.pop(), this.stack.pop()));
  }
  
  // duplicates last number
  // requires 1 number
  duplicateOne() {
    if (this.stack.length < 1) {return}
    this.stack.push(this.stack[this.stack.length - 1]);
  }
  
  duplicate() {
    if (this.stack.length < 2) {return}
    const x = this.stack.pop();
    this.stack.push(this.stack[this.stack.length - x]);
    this.stack.push(x);
  }
  
  // unused
  /*
  duplicateMultiple() {
    if (this.stack.length < 2) {return}
    const x = this.stack.pop();
    duplicateLastN(this.stack, x);
    this.stack.push(x);
  }
  */
  
  // removes last number
  // requires 1 number
  remove() {
    if (this.stack.length < 1) {return}
    this.stack.pop();
  }
  
  // flips last two numbers
  // requires 2 numbers
  flip() {
    if (this.stack.length < 2) {return}
    const x = this.stack[this.stack.length-1];
    this.stack[this.stack.length-1] = this.stack[this.stack.length-2];
    this.stack[this.stack.length-2] = x;
  }
  
  // pops last number and pushes every nautral number up to that number
  // requires 1 number
  iota() {
    if (this.stack.length < 1) {return}
    const x = this.stack.pop();
    for (let i=1; i<=x; i++) {
      this.stack.push(i);
    }
  }
  
  move() {
    if (this.stack.length < 2) {return}
    const x = this.stack.pop();
    if (x === 0) {return}
    const y = this.stack.pop();
    if (x > 0) {
      this.stack.splice(this.stack.length - x, 0, y);
    } else {
      this.stack.splice(-1-x, 0, y);
    }
    this.stack.push(x);
  }
  
  // pushes pi
  pi() {
    this.stack.push(Math.PI);
  }
  
  // pushes e
  e() {
    this.stack.push(Math.E);
  }
  
  sin() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.sin(this.stack.pop()));
  }
  
  cos() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.cos(this.stack.pop()));
  }
  
  tan() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.tan(this.stack.pop()));
  }
  
  asin() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.asin(this.stack.pop()));
  }
  
  acos() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.acos(this.stack.pop()));
  }
  
  atan() {
    if (this.stack.length < 1) {return}
    this.stack.push(Math.atan(this.stack.pop()));
  }
  
  radToDeg() {
    this.stack.push(57.29577951308232);
  }
  
  degToRad() {
    this.stack.push(0.017453292519943295);
  }
  
  round() {
    if (this.stack.length < 2) {return}
    const x = this.stack.pop();
    this.stack.push(Math.round(this.stack.pop() / x) * x);
  }
  
  rotate() {
    if (this.stack.length < 1) {return}
    const x = this.stack.pop();
    this.stack = rotateArray(this.stack, pMod(-x, this.stack.length))
    this.stack.push(x);
  }
  
  modulo() {
    if (this.stack.length < 2) {return}
    this.stack.push(pMod(this.stack.pop(), this.stack.pop()));
  }
  
  clear() {
    this.stack = [];
  }
  
  // ===== internal =====
  
  interpret(inst) {
    if (inst === "") {
      return this.stack;
    }
    if (Object.keys(this.operations).includes(inst)) {
      this[this.operations[inst]]();
      return this.stack;
    }
    if (Object.keys(this.scripts).includes(inst)) {
      this.calculate(this.scripts[inst]);
      return this.stack;
    }
    this.stack.push(Number(inst));
    return this.stack;
  }
  
  calculate(l) {
    l.split(" ").forEach((inst) => this.interpret(inst));
    return this.stack;
  }
}

function updateStackVisual(calc) {
  let vis = "";
  calc.stack.forEach((val) => {
    vis += "<td>" + val + "</td>";
  });
  document.getElementById("stackDisplay").children[0].children[0].innerHTML = vis;
}

calculator = new StackCalc();
calculator.calculate("0");

addEventListener("DOMContentLoaded", (event) => {
  updateStackVisual(calculator);
  var inputInst = document.getElementById("inputInst");

  inputInst.addEventListener("keypress", (event) => {
    
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      calculator.calculate(inputInst.value);
      inputInst.value = "";
      updateStackVisual(calculator);
    }
    
  });
  
});
