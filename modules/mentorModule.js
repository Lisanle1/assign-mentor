const { ObjectId } = require( 'mongodb' );
const mongo=require('../connect');


module.exports.getAllMentors=async(req,res)=>{
    try{
        const getResponse=await mongo.selectedDb.collection('mentors').find().toArray();
        res.send(getResponse);
    }
    catch {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
}

module.exports.createMentor=async(req,res)=>{
    try{
        const existUser=await mongo.selectedDb.collection('mentors').find({$and:[{mentorId:req.body.mentorId},{mentorName:req.body.mentorName},{contacts:req.body.contacts}]}).count()>0
        if(existUser){
            res.send('Mentor already exists')
        }
        else{
        await mongo.selectedDb.collection('mentors').insertOne(req.body)
        res.send({
            statusCode:201,
            message:"mentor added successfully"
        })
    }
}
    catch {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
}

module.exports.assignStudentsToMentor=async(req,res)=>{
    try{
        let id=req.params.id
        const updatedResponse=await mongo.selectedDb.collection('mentors').updateOne({_id:ObjectId(id)},{$set:{studentId:req.body.studentId}})
        res.send(updatedResponse);
    }
    catch {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
}