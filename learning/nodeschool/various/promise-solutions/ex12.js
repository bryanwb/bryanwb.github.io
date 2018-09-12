const http = require('q-io/http');

//const url = 'https://jsonplaceholder.typicode.com/todos/1';
const url = 'http://localhost:1337';

http.read(url).then(JSON.parse).then(console.log);
