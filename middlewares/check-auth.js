// const isAuth = (req, res, next) => {
//     if(req.session.isLoggedIn){
//         return next();
//     }
//     return res.send({error:'User must be logged in to perform this action'})
// }


const isAuth = (req, res, next) => {
    // Check if the user is logged in
    if (req.session.isLoggedIn) {
      // If the user is logged in, check the presence of a JWT token in the request headers
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }
  
      // Verify the token
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
  
        // If the token is valid, you can access the user's information from the 'decoded' object
        req.user = decoded;
        next();
      });
    } else {
      return res.status(403).json({ error: 'User must be logged in to perform this action' });
    }
  };

module.exports = isAuth