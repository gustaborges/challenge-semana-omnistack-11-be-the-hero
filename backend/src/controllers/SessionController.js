const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { id } = request.body; // ID informado é enviado em Json pelo corpo da requisição
        const ongName = await connection('ongs').where('id', id).select('name').first();
        if (!ongName) {
            return response.status(401).json({ error: `No ONG found with ID ${ id }`});
        }
        return response.status(200).json( ongName );
    }
}