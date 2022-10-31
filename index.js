import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/uploads");
    },
    filename: (req,file,cb)=>{
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-") + "-" + Date.now()

        cb(null, fileName+fileExt)
    }
    
});

const fileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpeg" ||file.mimetype === "image/png" || file.mimetype === "image/jpg"){
            cb(null, true)
        }else{
            cb(new Error("Only JPEG, JPG and PNG images are allowed."))
        }
    }
})




export default fileUpload;
