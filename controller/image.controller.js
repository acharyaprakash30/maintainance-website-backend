const upload = (req,res)=>{
    if(req.file.filename){
        res.status(201).json({
            message:"Image uploaded successfully",
            url:req.file.filename
        })
    }else{
        res.status(500).json({
            message:"something went wrong"
        })
    }
}

module.exports={
    upload:upload
}