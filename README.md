# stylus-bem-evaluator

## About
replaces the `/` in `/__child` or `/--mod` with the first parent block selector

## Installation
run `npm i stylus-bem-evaluator` in the terminal

## How to use
```
var stylus = require('stylus'),
  str =
  `.parent 
    .block
      /__child
        color: blue`;

stylus(str)
  .use(require('stylus-bem-evaluator')
  .render(function (err, css) {
    console.log(err || css);
    // .parent .block .block__child {
    //   color: #00f;
    // }
  });
```