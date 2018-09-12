var arg1 = process.argv[2];
var arg2 = process.argv[3];
import {PI, sqrt, square} from './Math';
/* var PI = require('./Math').PI;
 * var sqrt = require('./Math').sqrt;
 * var square = require('./Math').square; */

console.log(PI);
console.log(sqrt(+arg1));
console.log(square(+arg2));
