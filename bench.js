module.exports = function() {
  return {
    marks:{},
    start:function(key){
      this.mark(key,1);
    },
    end:function(key){
      this.mark(key,0);
    },
    report:function(){
      var z = this;
      var report = {};
      Object.keys(z.marks).forEach(function(k){
        //
        var t = z.marks[k].total
        ,wholeAvg = t[0]/z.marks[k].count
        ,samples = z.marks[k].samples
        ,windowTotal = [0,0]
        ;

        samples.forEach(function(sample){ 
          z._addHrtime(windowTotal,sample);
        });

        var micro = (windowTotal[0]*10000)+(windowTotal[1]/10000);
        var slidingAvg = (micro/z.marks[k].count)/10000;
        report[k] = {count:z.marks[k].count,avg:wholeAvg,slidingAvg:slidingAvg,total:t};

      });
      return report;
    },
    remove:function(key){
      delete this.marks[key];     
    },
    // alias for end
    stop:function(key){ 
      this.mark(key,0);
    },
    _mark:function(key,on){
      if(!this.marks[key]) this.marks[key] = {start:false,total:[0,0],count:0,samples:[],cps:0};
      
      var t = process.hrtime();
      if(!on && this.marks[key].start) {
        var mem = process.memoryUsage();
        var elapsed = process.hrtime(this.marks[key].start);
        this.marks[key].samples.push(elapsed);
        if(this.marks[key].samples.length > 50) {
          this.marks[key].samples.shift();
        }
        this.marks[key].total = this._addHrtime(this.marks[key].total,elapsed);
        this.marks[key].start = null;
        ++this.marks[key].count;
      } else if(on) this.marks[key].start = t;
    },
    _addHrtime:function(t1,t2){
        t1[1] += t2[1];
        if(t1[1] > 999999999) {
          ++t1[0];
          t1[1] -= 1000000000;
        }
        t1[0] += t2[0];
        return t1;
    }
  }
};


