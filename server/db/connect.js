import mongoose from "mongoose";

const MongoosConnection = (uri, databaseName) => {
    return mongoose.connect(uri, { dbName: databaseName })
        .then( () => {
            return { connection: mongoose.connection.db }
        })
}

export default MongoosConnection;