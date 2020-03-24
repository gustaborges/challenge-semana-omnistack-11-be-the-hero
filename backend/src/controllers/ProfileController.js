const connection = require('../database/connection');

module.exports = {
    // Busca os incidentes de uma ONG especifica.
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.status(200).json( incidents );
    }

}