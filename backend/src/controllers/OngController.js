const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId.js');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.status('200').json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId();
        console.log(id);
        // declaramos a função assincrona e a execução do comando abaixo para aguardar o término de sua execução
        // antes de devolver uma resposta para o nosso cliente
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return response.status(201).json({ id }); // retorna o id da ong.        
    }
}