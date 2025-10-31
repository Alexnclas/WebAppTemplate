// const { MongoClient, ServerApiVersion } = require('mongodb');
// const readSecret = require("../utils/readSecrets");

// const dbUser = readSecret(process.env.MONGODB_ACCESS_KEY_FILE, "db_user");
// const dbUserPassword = readSecret(process.env.MONGODB_SECRET_KEY_FILE, "password");
// const uri = `mongodb+srv://${dbUser}:${dbUserPassword}@webapptemplatecluster0.3qandzz.mongodb.net/?appName=WebAppTemplateCluster0`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);