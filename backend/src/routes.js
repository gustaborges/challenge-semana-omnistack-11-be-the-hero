const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

// Importando os Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController'); // Controller do Login


// Rotas
routes.post('/sessions', SessionController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization : Joi.string().required()
    }).unknown(),
}), ProfileController.index);

// Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({ page: Joi.number(), })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys( { id: Joi.number().required() }),

}), IncidentController.delete);
// Ongs
routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({ 
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

// Exportando a variável routes
module.exports = routes; // exporta a variável routes