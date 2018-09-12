//const secret = process.argv[2] || 'secret';

/* const first = (secret) => {
 *   return Promise.resolve(secret);
 * }
 * 
 * const second = (val) => {
 *   return Promise.resolve(val);
 * }; */

first().then(second).then(console.log);



