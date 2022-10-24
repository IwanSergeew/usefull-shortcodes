const max = 1000000000;
const arr = new Array();
for (let i = 0; i < max; i++) {
  arr.push(i + 1);
}

let time = 0;
const results = new Array();

{
  time = new Date().getTime();
  let total = 0;
  arr.forEach((i) => (total += i));
  results.push({ name: "forEach", time: new Date().getTime() - time, total });
}

{
  time = new Date().getTime();
  const total = arr.reduce((a, b) => a + b, 0);
  results.push({ name: "reduce", time: new Date().getTime() - time, total });
}

{
  time = new Date().getTime();
  let total = 0;
  for (const i of arr) {
    total += i;
  }
  results.push({ name: "for of", time: new Date().getTime() - time, total });
}

{
  time = new Date().getTime();
  let i = max - 1;
  let total = 0;
  while (i >= 0) {
    total += arr[i];
    i--;
  }
  results.push({ name: "while", time: new Date().getTime() - time, total });
}

{
  time = new Date().getTime();
  let total = 0,
    obj;
  const iterator = arr[Symbol.iterator]();
  while (((obj = iterator.next()), !obj.done)) {
    total += obj.value;
  }
  results.push({
    name: "while itterator",
    time: new Date().getTime() - time,
    total,
  });
}

{
  time = new Date().getTime();
  let total = 0;
  for (let i = 0; i < max; ++i) {
    total += arr[i];
  }
  results.push({ name: "for", time: new Date().getTime() - time, total });
}

results.sort((a, b) => b.time - a.time);
results.forEach((r) => console.log(`(${r.total}) ${r.name}: ${r.time} ms`));
