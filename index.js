const express = require('express');
const path = require('path');
const terms = require('')
const PORT = 3000;

// Not supported in ES6
// const dir = path.join(__dirname);

// console.log(dir);

const app = express();

app.use(express.static('public_files'));

app.get('/', (client_request_obj, server_response_obj) => {
    // server_response_obj.send('Hello there');
    const pathToIndex = path.join(process.cwd(), 'views/index.html');
    server_response_obj.sendFile(pathToIndex);
});

app.get('/api', (client_request_obj, server_response_obj) => {
    const params = client_request_obj.query;
    if (params.term) {
        let filtered = terms.filter((obj) => obj.term === params.term);
        return server_response_obj.json(filtered);

        };
    server_response_obj.json(terms)
});

app.listen(PORT, () => {
    console.log('Server started on %s', PORT);
});

// app.listen(5000, () => {
//     console.log('Server started!');
// });
