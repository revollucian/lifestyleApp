const { Entry } = require('../models')
const handleAsync = require('../utils/handleAsync')
const off = require('openfoodfacts-nodejs');
const client = new off();


function calculateCaloriesConsumed(gramsConsumed, caloriesPer100g) {
    const caloriesPerGram = caloriesPer100g / 100;
    const totalCaloriesConsumed = gramsConsumed * caloriesPerGram;
    return totalCaloriesConsumed;
}

const getDailyEntry = handleAsync(async (req, res) => {
    try{
        const entry = await Entry.findOne({ date: req?.params?.date, user: req?.user?._id })
        if(!entry){
            const newEntry = await Entry.create({
                date: req?.params?.date,
                user: req?.user?._id,
            }) 
            return res.status(200).send({entry: newEntry})
        }
        return res.status(200).send({ entry: entry })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
})

const addProductToDailyEntry = handleAsync(async (req, res) => {
    try{
        //dates will be in unix timestamps
        const entry = await Entry.findOne({ date: req?.body?.date, user: req?.user?._id })
        //get the product referenced in the request
        const info = await client.getProduct(req?.body?.code);
        //if the product is not found return the request as unsuccesful
        if(!info || info?.status_verbose !== 'product found') return res.status(500).send({
            message: 'Product not found'
        })

        const calories = calculateCaloriesConsumed(
            req?.body?.grams_consumed, info?.product?.nutriments['energy-kcal_100g'] || req?.body?.calories_per_100g
        )
        const productDict = {
            code: info?.code,
            product_name: info?.product?.product_name,
            added_calories: calories
        }

        //if we dont find an entry corresponding with the date
        if(!entry){
            //we make a products array and push the product we found to it
            const products = []
            products.push(productDict)
            //we create an entry with the data that we need
            //inside total_calories we use a func that calculated the total calories consumed,
            //sometimes products dont have nutriments information, so we ask the user for it
            try{
                const entry = await Entry.create({
                    date: req?.body?.date,
                    user: req?.user?._id,
                    products: products,
                    total_calories: calories
                })
                return res.status(200).send({ message: 'Product added to entry', entry: entry })
            }catch(e){
                return res.status(500).send({ message: 'Something went wrong' })
            }

        }
        entry.products.push(productDict)
        entry.total_calories += calories
        const newEntry = await entry.save()
        return res.status(200).send({
            message: 'Product added to entry',
            entry: newEntry
        })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

const addArbitraryProductToDailyEntry = handleAsync(async (req, res) => {
    try{
        //dates will be in unix timestamps
        const entry = await Entry.findOne({ date: req?.body?.date, user: req?.user?._id })
        //get the product referenced in the request

        const calories = calculateCaloriesConsumed(
            req?.body?.grams_consumed, req?.body?.calories_per_100g
        )
        const productDict = {
            code: req?.body?.code,
            product_name: req?.body?.product_name,
            added_calories: calories
        }

        //if we dont find an entry corresponding with the date
        if(!entry){
            //we make a products array and push the product we found to it
            const products = []
            products.push(productDict)
            //we create an entry with the data that we need
            //inside total_calories we use a func that calculated the total calories consumed,
            //sometimes products dont have nutriments information, so we ask the user for it
            try{
                const entry = await Entry.create({
                    date: req?.body?.date,
                    user: req?.user?._id,
                    products: products,
                    total_calories: calories
                })
                return res.status(200).send({ message: 'Product added to entry', entry: entry })
            }catch(e){
                return res.status(500).send({ message: 'Something went wrong' })
            }

        }
        entry.products.push(productDict)
        entry.total_calories += calories
        const newEntry = await entry.save()
        return res.status(200).send({
            message: 'Product added to entry',
            entry: newEntry
        })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

const collectStatistics = handleAsync(async (req, res) => {
    try{
        const entries = await Entry.find({ user: req?.user?._id }).lean();
        if(!entries) return res.status(500).send({ message: 'Could not find any entries for this use' })
        return res.status(200).send({ message: 'Found', entries: entries })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
})


module.exports = {
    getDailyEntry,
    addProductToDailyEntry,
    addArbitraryProductToDailyEntry,
    collectStatistics,
};