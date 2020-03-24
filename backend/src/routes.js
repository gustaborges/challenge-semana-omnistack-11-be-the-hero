const express = require('express');
const routes = express.Router();

// Importando os Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController'); // Controller do Login


// Rotas
routes.post('/sessions', ProfileController.index);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
// Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Exportando a variável routes
module.exports = routes; // exporta a variável routes