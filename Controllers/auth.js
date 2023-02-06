const User                                    = require('../Models/User');
const { StatusCodes }                         = require('http-status-codes');
const { UnauthenticatedError, BadRequestError } = require('../errors');

 
const register = async (req, res) => {      
    const user = await User.create({ ...req.body }) 
    const token = user.createJWT()        
    // JWT functions were carried out in the users model by schema
    res.status(StatusCodes.CREATED).json( { user:{ name: user.name }, token })
}
 
const login = async (req, res) => {
    const  { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    } 

    const user = await User.findOne({email}) 
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials provided')
    }    

    const compareThePassword = await user.comparePassword(password)
        if(!compareThePassword) {
        throw new UnauthenticatedError('Invalid Credentials provided')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user:{ name:user.name }, token})
}

 
module.exports ={
    register,
    login
} 