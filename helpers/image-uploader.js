const multer = require("multer")
const path = require("path");


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime()+path.extname(file.originalname))
    }
});

const filerFilter=(req,file,cb)=>{ 
    if(file.mimetype=== 'image/png' || file.mimetype=== 'image/jpeg'){
        cb(null,true)
    }else{
        cb(new Error("Unsupported file type"),false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10   
    },
    fileFilter:filerFilter
})

module.exports={
    upload:upload
}