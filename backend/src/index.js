const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors()) // cors({origin: 'http://meuapp.com'}) determina qual aplicação front-end pode acessar o nosso back

app.use(express.json());
app.use(routes); /* Nosso expressApp vai usar os routes do arquivo routes */
app.listen(3333);


//app.get(NOME_DA_ROTA, FUNCTION(request, response) => { })
// agora os routes da nossa aplicação estão no arquivo routes.js