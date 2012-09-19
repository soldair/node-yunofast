[![Build Status](https://secure.travis-ci.org/soldair/node-yunofast.png)](http://travis-ci.org/soldair/node-yunofast)

# yunofast

super light benchmarking tool designed to leave in long running server code.

## example

```js
var bench = require('yunofast')

var b = bench();

var c = 0;
(function fn(){
  c++;

  b.start('test');
  setTimeout(function(){
    b.end('test');
    if(c < 150) fn();
    else console.log(b.report());
  },10+(+((''+Math.random()).substr(4,2))));

}());

```

## api

bench()
  - returns new benchmark object

bench.start(key)
  - start a timer for key

bench.end(key) / bench.stop(key)
  - stop a timer for a key

bench.report()
  - return a summary report of all keys

bench.remove(key)
  - drop all marks for key

## report output

```js
{ test:
   { count: 60,
     avg: 0.05,
     slidingAvg: 0.0682593545,
     total: [ 3, 906278613 ] } }

```

## woo hoo

let me know if you have any issues or this is useful.

