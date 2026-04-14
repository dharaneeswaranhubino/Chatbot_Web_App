import multer from "multer";
import path from "node:path";
import fs from "fs";

const uploadDir = "uploads/Profiles";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, uploadDir);
    },
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}_${file.originalname}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req:any, file:Express.Multer.File, cb:multer.FileFilterCallback)=>{
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Only jpeg,png,jpg,webp files are allowed"));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:2*1024*1024,
    }
})