const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_CLUSTER}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to mongoDB")
})
