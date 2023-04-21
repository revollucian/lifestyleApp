const handleAsync = require('../utils/handleAsync')
const off = require('openfoodfacts-nodejs');
const client = new off();

const productGet = handleAsync(async (req, res) => {
    try{
        const info = await client.getProduct(req?.params?.code);
        return res.status(200).send(info)
    }catch(e){
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

module.exports = {
    productGet,
};