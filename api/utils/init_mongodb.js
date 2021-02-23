const mongoose = require("mongoose"); // database URIs
const maindb = 'mongodb+srv://durgesh07:934521796@cluster0.zr3jl.mongodb.net/PGP?authSource=admin&replicaSet=atlas-a4xj7z-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
const localdb = 'mongodb://localhost:27017/tmp?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

// connecting to database
mongoose
    .connect(maindb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("database connection was successful...")
    })
    .catch((err) => {
        console.log(err.message)
    })

mongoose.connection.on("connected", () => {
    console.log("database connected!")
})

mongoose.connection.on("error", (err) => {
    console.log(err.message)
})

mongoose.connection.on("disconnected", () => {
    console.log("database disconnected!")
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})