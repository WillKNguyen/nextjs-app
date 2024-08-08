import {MongoClient, ServerApiVersion} from 'mongodb'

const uri = 'mongodb+srv://nknguyen10b:JUt3asDU9CpH@cluster0.u5vt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let client

const getClient = async () => {
    if (!client) {
        try {
            client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            await client.connect();   
            console.log("Client connected")
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return client;
};

const getDatabase = async (dbName) => {
    const client = await getClient();
    return client.db(dbName);
};

await getClient()

export {getDatabase}
  