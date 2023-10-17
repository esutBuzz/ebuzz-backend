
const ValidateUser = require("../utils/validate")






const validateCredentials = ( req, res, next) => {
   const {
     username,
     email,
     password,
     phoneNumber,
   } = req.body;
  // username, email, password, phoneNumber)
   const user = new ValidateUser(
     username,
     email,
     password,
     phoneNumber
   );
   console.log(req.body)
   //console.log(user);
   user.isEmail();
   user.isPassword();
   user.isUsername();
   user.isPhoneNumber();

   let msg = undefined;
   for (const str of user.messages) {
     if (typeof str == "string") {
       msg = str;
     }
   }
   if( typeof msg == 'string'){
      return res.send({errorMessage: msg})
   }else {
      next()
   }
   
   
   
   
   
}

 


module.exports = validateCredentials