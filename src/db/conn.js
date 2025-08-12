import { mongoose } from 'mongoose';
const DB="mongodb+srv://ruarijitsarkar:wvv7sTRBMWUSLuz9@cluster0.rt4sp.mongodb.net/olymips_boy?retryWrites=true&w=majority"

mongoose.connect(DB, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:false,
}).then(() => {
    console.log("connection successfull");
}).catch((e)=>{
    console.log("No connection"+e);
})