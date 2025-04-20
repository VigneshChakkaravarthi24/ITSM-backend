const User = require("../models/sqlModels/User");
const Tickets = require("../models/sqlModels/Tickets")
// const Quiz = require("../models/sqlModels/Quiz");
// const ExamStatus=require("../models/sqlModels/examStatus")
// const Audio = require("../models/sqlModels/audioStatus");
// const Answers = require("../models/sqlModels/answer")
const generateJWT=require("../util/JWT")
const sendEmail = require("../util/sendEmail");
const Admin = require("../models/sqlModels/Admin");


exports.getTickets=async(req,res,next)=>{
    const email=req.body.email
    const tickets = await Tickets.findAll({
        include:[{
            model:User
        }]
    })
    if(tickets)
    {
        return res.status(200).json({ticket:tickets})
    }
    return res.status(404).json({errorMessage:"No tickets found"})
}
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const role = req.body.role;
  
    let user; 
  
    try {
      if (role === 'User') {
        user = await User.findOne({ where: { UserEmail: email } });
        if (!user) {
          return res.status(404).json({ errorMessage: 'User not found' });
        }
      } else if (role === 'Admin') {
        user = await Admin.findOne({ where: { adminEmail: email } });
        if (!user) {
          return res.status(404).json({ errorMessage: 'Admin not found' });
        }
      }
      else{
        return res.status(404).json({ errorMessage: 'Invalid Group ' });

      }
  
      const jwt = generateJWT(email);
      return res.status(200).json({ token: jwt, user: user });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ errorMessage: 'Internal server error' });
    }
  };
  

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








exports.enteredFinalController=async(req,res,next)=>{
    res.json({message:true})
}









