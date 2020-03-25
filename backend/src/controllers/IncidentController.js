const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        /*Esquema de Paginação   /incidents?page=3  */
        const { page = 1 } = request.query; // por default é 1
        const [count] = await connection('incidents').count(); // armazena total de registros em incidents table
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        // Guardando no cabeçalho da response o total de registros em incidents
        console.log(count);
        response.header('X-Total-Count', count['count(*)']); // acessa a propriedade 'count(*)' armazenada em count

        return response.status(200).json( incidents );
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // o id da ong vem de qual ong está autenticada.
        // obtemos isso no cabeçalho da requisição
        const ong_id = request.headers.authorization;
        try {
            const [id] = await connection('incidents').insert( {
                title,
                description,
                value,
                ong_id
            });
            // ou const result = await connection('incidents').insert(.....
            // e depois acessar o único registro result[0]
            return response.status(201).json( { id } );
        }
        catch {
          return response.status(422).send('Invalid argument');
        }
    },

    async delete(request, response) {
        const { id } = request.params; // Route Params /incident/:id
        const ong_id = request.headers.authorization;

        const incident = await connection('incident')
            .where('id', id)
            .select(ong_id)
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json( { error: 'Operation not permitted.' } );
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}