var AnotherModule = require('./another_module');

var anotherModule = new AnotherModule({low : "very low", high : "very high"});

console.log(anotherModule.high());
console.log(anotherModule.low());
