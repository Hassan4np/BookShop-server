const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
// var jwt = require('jsonwebtoken');
const e = require('express');
// const cookiesParser = require('cookie-parser');
require("dotenv").config();
const port = process.env.PORT || 5000;

//middle were data bancend get koror jonno.
app.use(cors());
app.use(express.json());


// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.uruvxpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        const database = client.db('BookShopBD');
        const BookCollection = database.collection('book');
        await client.connect();
        app.get('/book', async(req, res) => {
            const result = await BookCollection.find().toArray();
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello Hassa..........................................n')
})

app.listen(port, () => {
    console.log(`
Example app listening on port ${port}
`)
})