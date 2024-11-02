import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'
import Breeder from '../models/Breeder.js';

const registerUser = async (req, res) => {
    const { 
        email, 
        password,
        first_name,
        last_name,
        phone_number,
        adress,
        city,
        province,
        postal_code,
        other_apps_deposits, 
        heard_about, 
        dog_sex, 
        dog_colour, 
        housing, 
        temperament, 
        responsibility, 
        hours_alone, 
        airports, 
        additional_information, 
        individuals, 
        training
    } = req.body

    if(!email || !password){
        throw new BadRequestError("Please provide all values.")    
    }
    
    const userAlreadyExists = await User.findOne({email})

    if(userAlreadyExists){
        res.send(StatusCodes.CONFLICT).json({msg: "error"})
        throw new BadRequestError('User already in use.')
    }
    
    const userObject = {
        email,
        password,
        first_name,
        last_name,
        phone_number,
        adress,
        city,
        province,
        postal_code,
        questionnaire: {
            other_apps_deposits, 
            heard_about, 
            dog_sex, 
            dog_colour, 
            housing, 
            temperament, 
            responsibility, 
            hours_alone, 
            airports, 
            additional_information, 
            individuals, 
            training
        }
    }

    const user = await User.create(userObject);

    const token = user.createJWT();


    res.status(StatusCodes.CREATED).json({ 
        user: { 
            email:user.email
        },
        token
    });  
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values.');
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "error"})
        throw new UnauthenticatedError('Invalid Credentials');
    }else{
        const isPasswordCorrect = await user.comparePassword(password);
        const token = user.createJWT();
        
        if(!isPasswordCorrect){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "error"})
            throw new UnauthenticatedError('Invalid Credentials');
        }
        
        user.password = undefined;
        res.status(StatusCodes.OK).json({ user, token });
    }
}

const registerBreeder = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide all values.")    
    }
    
    const breederAlreadyExists = await Breeder.findOne({email})

    if(breederAlreadyExists){
        res.send(StatusCodes.CONFLICT).json({msg: "error"})
        throw new BadRequestError('Breeder already in use.')
    }
    
    const breeder = await Breeder.create(req.body);

    const token = breeder.createJWT();

    res.status(StatusCodes.CREATED).json({ 
        breeder: { 
            email:breeder.email,
            id: breeder._id
        },
        token
    });  
}

const loginBreeder = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values.');
    }

    const breeder = await Breeder.findOne({ email }).select('+password');

    if(!breeder){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "error"})
        throw new UnauthenticatedError('Invalid Credentials');
    }else{
        const isPasswordCorrect = await breeder.comparePassword(password);
        const token = breeder.createJWT();
        
        if(!isPasswordCorrect){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "error"})
            throw new UnauthenticatedError('Invalid Credentials');
        }
        
        breeder.password = undefined;
        res.status(StatusCodes.OK).json({ breeder, token });
    }
}

const verifyToken = async (req, res) => {
    
    const token = req.body.token

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error('Token verification failed:', err.message);
          res.status(StatusCodes.UNAUTHORIZED).json(err.message)
        } else {
          // Token verification successful

          console.log('Token verified successfully');
          console.log('Decoded token payload:', decoded);
          res.status(StatusCodes.OK).json(decoded)
        }
      });
}

export { registerUser, loginUser, registerBreeder, loginBreeder, verifyToken }