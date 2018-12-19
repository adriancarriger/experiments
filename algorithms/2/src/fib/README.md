# Matrix multiplication

## Base

$$
  \begin{bmatrix}
    a & b \\
    c & d
  \end{bmatrix}
  \begin{bmatrix}
    e & f \\
    g & h
  \end{bmatrix}
  = \begin{bmatrix}
    ae + bg & af + bh \\
    ce + dg & cf + dh
  \end{bmatrix}
$$

## Special case

$$
  \begin{bmatrix}
    a & b \\
    b & c
  \end{bmatrix}
  \begin{bmatrix}
    d & e \\
    e & f
  \end{bmatrix}
  = \begin{bmatrix}
    ad + be & ae + bf \\
    bd + ce & be + cf
  \end{bmatrix}
$$

## Conversion

### Facts

Given that:

$$
  \begin{bmatrix}
    a & b \\
    b & c
  \end{bmatrix}
  = \begin{bmatrix}
    d & e \\
    e & f
  \end{bmatrix}
  = \begin{bmatrix}
    1 & 1 \\
    1 & 0
  \end{bmatrix}
$$

then the following is true:

$$a = b + c$$
$$d = e + f$$

Therefore:

$$ae + bf = bd + ce$$

### New equation

$$
  \begin{bmatrix}
    a & b \\
    b & c
  \end{bmatrix}
  \begin{bmatrix}
    d & e \\
    e & f
  \end{bmatrix}
  = \begin{bmatrix}
    ad + be & ae + bf \\
    ae + bf & be + cf
  \end{bmatrix}
$$

## Simplification

$$[a, b, c][d, e, f] = [ad + be, ae + bf, be + cf]$$

Or in JavaScript

```javascript
function multiply([a, b, c], [d, e, f]) {
  return [a * d + b * e, a * e + b * f, b * e + c * f];
}
```

## O(n) fib solution

At this point we have a matrix based O(n) solution:

```javascript
function fib(n) {
  return raise([1, 1, 0], n - 1)[0];
}

// This is O(n)
function raise(input, n) {
  let result = input;
  for (let i = 0; i <= n; i++) {
    result = multiply(result, input);
  }

  return result;
}

function multiply([a, b, c], [d, e, f]) {
  return [a * d + b * e, a * e + b * f, b * e + c * f];
}

fib(5);
```

But we can do better 🙂

## O(lgn) solution

By using fast exponenitation we can get O(lgn)!

```javascript
const memo = {};

// O(lgn)
function raise(matrix, n) {
  if (n === 1) {
    return matrix;
  } else if (memo[n] !== undefined) {
    return memo[n];
  }

  const halves = raise(matrix, Math.floor(n / 2));
  let result = multiply(halves, halves);

  if (n % 2 !== 0) {
    result = multiply(result, matrix);
  }

  return (memo[n] = result);
}
```
