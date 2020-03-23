const express = require('express');

const expressApp = express();

expressApp.get('/', (request, response) => {
    // response.send('Hello world');
    return response.json({
            aluno : 'Gustavo',
            evento: 'Semana Omnistack 11.0'
        });
});

expressApp.listen(3333);0