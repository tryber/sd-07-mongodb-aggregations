const a = { total: 357594, diaDaSemana: 5 };
const b = { diaDaSemana: 5, total: 357594 };
const c = { total: 357594, diaDaSemana: 5 };
const d = [0, 1];
const e = [0, 1];
const f = [...e];

console.log(a.total === b.total);
console.log(a === c);
console.log(a);
console.log(b);
console.log(c);
console.log(d === e);
console.log(e === f);
f[2] = 2;
console.log(f);
console.log(e);
