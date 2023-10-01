require("dotenv").config();
require("./config/database")
const app = require("./routes")

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on port ${process.env.PORT}.`);
});
