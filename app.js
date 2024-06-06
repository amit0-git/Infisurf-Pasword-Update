const express=require("express")
const fs = require('fs').promises;

app=express()


// ejs engine

app.set("view engine","ejs")
app.set("views","views")
app.use(express.urlencoded({ extended: true }))
const port=process.env.PORT || 3000;

// set api for updating the password in the text file 
app.get("/update",(req,res)=>{
    res.render("update")
})



app.post("/save", (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const dataToAppend = `${username},${password}\n`;

    fs.appendFile('passwords.txt', dataToAppend, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Password saved successfully!');
    });
})




async function readData() {
    try {
        const data = await fs.readFile('passwords.txt', 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

app.get("/data",async (req,res)=>{


    const data1=await readData();
    console.log(data1)
    res.send(data1)

})










app.listen(port,()=>{

    console.log("Server Started on PORT: "+port)
})










