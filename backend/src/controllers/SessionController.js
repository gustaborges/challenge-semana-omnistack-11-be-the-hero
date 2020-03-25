const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { id } = request.body; // ID informado é enviado em Json pelo corpo da requisição
        const ong = await connection('ongs').where('id', id).select('name').first();
        if (!ong) {
            return response.status(400).json({ error: `No ONG found with ID ${ id }`});
        }
        return response.status(200).json( { ong } );
    }
}