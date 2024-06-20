const jwt = require('jsonwebtoken')

function authentiateToken(req, res, next){
    const authToken = req.headers['authorization']
    const token = authToken && authToken.split(' ')[1]
    if (token ===null){res.status(401).send('Token Expired')}
    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err) res.status(403).send(err)
        req.user = user 
        next() 
    })
}


module.exports = authentiateToken