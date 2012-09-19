var test = require('tap').test
, bench = require(__dirname+'/../bench.js')
, b = bench()
;

test("test can benchmark",function(t){
  var c = 0;
  (function fn(){
    c++;

    b.start('test');
    setTimeout(function(){
      b.end('test');
      if(c < 60) fn();
      else {
        var report = b.report();
        t.equals(report['test'].count,60,"should have measured 10 samples");
        t.ok(report['test'].avg > 0.01,'should have good avg');
        t.ok(report['test'].slidingAvg > 0.01,'should have good sliding avg');
        t.equals(b.marks['test'].samples.length,50,'should cull samples');
        t.end();
      }
    },10+(+((''+Math.random()).substr(4,2))));

  }());
});
