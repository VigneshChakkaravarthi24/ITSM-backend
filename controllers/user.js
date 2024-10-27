const User = require("../models/sqlModels/User");
const Tickets = require("../models/sqlModels/Tickets")
// const Quiz = require("../models/sqlModels/Quiz");
// const ExamStatus=require("../models/sqlModels/examStatus")
// const Audio = require("../models/sqlModels/audioStatus");
// const Answers = require("../models/sqlModels/answer")
const generateJWT=require("../util/JWT")
const sendEmail = require("../util/sendEmail")

// // needed

exports.login=async(req,res,next)=>{
    const email=req.body.email
    const user =await User.findOne({where:{UserEmail:email}})
    if(!user)
    {
    return res.status(404).json({ errorMessage: 'User not found' });

    }

    const jwt=generateJWT(email)
    return res.status(200).json({ token:jwt,user:user});



    }

    exports.createTicket=async(req,res,next)=>{
       
       try
       {
        const email = req.email
        console.log("Trying to create ticket")

        const user = (req.body.user)
        const title = req.body.title
        const description = req.body.description
        const contact = req.body.contact
        console.log("The suerid",user.UserID)
        const ticket = await Tickets.create({
            UserID : user.UserID,
            Title: title,
            Description: description,
            Contact : contact,
            TicketStatus:"Unassigned"

        })

        
        const result = await ticket.save()
        if(result)
        {
           const email_sent =  sendEmail(result.TicketID,user.UserEmail,user.UserName)
           if(email_sent)
           {
            return res.json({message:"Ticket created successfull",result:result})
        }
        }
        return res.json({errorMessage:"Somehting went wrong"})


       }
  
catch(error)
{
    return res.json({errorMessage:error})

}
    }
exports.filterTicketByUserID=async(req,res,next)=>
{

    const email = req.email
    const user = req.body.user
    const tickets =await Tickets.findAll({where:{UserID:user.UserID}})
    return res.json({tickets:tickets})
}
// exports.getEssayQuestionAndStatus=async(req,res,next)=>{
//     const email = req.email
//     const quizCode = req.quizCode
//     try
//     {
//         const user = await User.findOne({email:email})
//         const quiz = await Quiz.findOne({quizCode:quizCode})
//         const answer = await Answers.findOne({userId:user.userID,quizId:quiz.quizId})
//         remainingTime= answer? answer.examDurationLeftInSeconds:quiz.testDurationInSeconds
//         let answerContent= answer?answer.answer:''
//         return res.json({quiz:quiz,remainingTime:remainingTime,answer:answerContent})
//     }
//     catch(error)
//     {
//         return res.status(404).json({ errorMessage: `An error has occured ${error}` })

//     }
// }
// exports.endExam=async(req,res,next)=>{
//     const email=req.email
//     const quizCode=req.quizCode
//     try{

//         const user=await User.findOne({where:{email:email}})
//         const quiz=await Quiz.findOne({where:{quizCode:quizCode}})
//         const examStatus=await ExamStatus.create({
//             userID:user.userID,
//             quizId:quiz.quizId,
//             status:'ended'
//         })
//         const result =await examStatus.save()
//         if(result)
//         {
//             return res.json({message:"success"})
//         }
        
//     }

//     catch(error)
//     {
//         return res.status(404).json({ errorMessage: `An error has occured ${error}` })

//     }
// }
// exports.validateTestFinish=async(req,res,next)=>{
//     const email=req.email
//     const quizCode=req.quizCode
//     try
//     {
//         const user = await User.findOne({email:email})
//         const quiz = await Quiz.findOne({quizCode:quizCode})
//         const examStatus = await ExamStatus.findOne({userId:user.userID,quizId:quiz.quizId})
//         if(examStatus)
//         {
            
//             return res.json({errorMessage:"You have already completed the test!. Kindly contact admin if you wish to restart."})
//         }
//         else
//         {
//             next()
//         }
//     }
//     catch(error)
//     {
//         return res.status(404).json({ errorMessage: `An error has occured ${error}` })

//     }
    


// }
// // needed









exports.enteredFinalController=async(req,res,next)=>{
    res.json({message:true})
}









// exports.saveWritingAnswer = async (req, res, next) => {
//     const email = req.email
//     const quizCode = req.quizCode 
//     const answerText = req.body.answer
//     const examDurationLeftInSeconds = req.body.remainingTime
//     const ended = req.body.ended
//     const verbatimFlagged=req.body.verbatimFlagged
//     // Remove substrings, keeping only the longest phrases
//     const filteredVerbatimFlagged = JSON.stringify(verbatimFlagged.filter((phrase, index) => 
//         !verbatimFlagged.some((otherPhrase, otherIndex) => 
//             otherIndex !== index && otherPhrase.includes(phrase)
//         )
//     ));
    
//         try
//     {
//         const user = await User.findOne({where:{email:email}})
//         const quiz= await Quiz.findOne({where:{quizCode:quizCode}})
//         let answer = await Answers.findOne({ where: { userID: user.userID, quizId: quiz.quizId } });
//         let result
//         if (answer) {
//             // If the answer exists, update the existing answer
//             answer.answer = answerText;
//             answer.verbatimWordsFlagged = filteredVerbatimFlagged;
//             answer.examDurationLeftInSeconds = examDurationLeftInSeconds;
//            result= await answer.save();
//         } else {
//             // If the answer does not exist, create a new one
//             answer = await Answers.create({
//                 userID: user.userID,
//                 quizId: quiz.quizId,
//                 answer: answerText,
//                 verbatimWordsFlagged: filteredVerbatimFlagged,
//                 examDurationLeftInSeconds: examDurationLeftInSeconds
//             });
//             result=await answer.save();
//         }

//           if(ended)
//           {
//             const examStatus=await ExamStatus.create({
//                 userID: user.userID,
//             quizId: quiz.quizId, 
//             status:'submitted'
//             })
//             await examStatus.save();
//           }
//           if(result)
//           {
//             return res.json({message:'Save Successful'})
//           }


                    
        
//     }
//     catch(error)
//     {
//         console.log("The error is the answer is",error)
//     }
    
// }









    
