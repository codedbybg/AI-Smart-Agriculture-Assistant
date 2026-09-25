const healthCheck = (req , res)=>{
    res.status(200).json({
        success : true,
        message : "Test controller is working",
    });
};

const testPost = (req , res)=>{

    const data = req.body;

    res.status(200).json({
        success : true,
        message : "POST request received successfully",
        receivedData : data,
    });

    console.log(data);
};

module.exports = {
    healthCheck,
    testPost
}