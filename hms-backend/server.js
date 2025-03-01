import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
    api_key: process.env.CLOUDINAY_API_KEY,
    api_secret: process.env.CLOUDINAY_API_SECRET
});

app.get("/", (req, res)=> {
    res.send("Welcome to server");
});

app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT}`);
});