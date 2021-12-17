// NODEJS required packages (EJS is template engine so we can use JS in HTML file)
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// express server creation
const app = express();

// server port # (string represents designated vs local port)
const PORT = process.env.PORT || 3000;

// set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// parsing html data for POST request (when user enters video ID, grabs data from front end while on the backend)
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/convert-mp3", async (req, res) => {
const videoID = req.body.videoID;
if (
    videoID === undefined ||
    videoID === "" ||
    videoID === null
){
    return res.render("index", {success : false, message : "Please enter a video ID"});
}else {
    const fetchAPI = await fetch (`https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}` , {
        "method" : "GET" ,
        "headers": {
            "x-rapidapi-key" : process.env.API_KEY,
            "x-rapidapi-host" : process.env.API_HOST
        }
    });

    const fetchResponse = await fetchAPI.json();

    if(fetchResponse.status === "okay")
    return res.render("index", {success : true, song_title: fetchResponse.title, song_link : fetchResponse.link});
    else
        return res.render("index", {success: false, message : fetchResponse.msg})
}
})


// server loading..
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})