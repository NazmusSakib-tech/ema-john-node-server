const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o7umd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("online_shop");
        const productCollection = database.collection("products");

    //    GET Product API
    app.get('/products', async (req, res) => {
        const cursor = productCollection.find({});
        const products = await cursor.toArray();
        const count = await cursor.count();

        res.send({
            count, 
            products
        });
    })

    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', function (req, res) {
    console.log('server running');
    res.send("server running");
})

app.listen(port, () => {
    console.log("server running on port: " + port);
})
