import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
    secret: process.env.JWT_SECRET as string, // Change this to your secret key
};

console.log('JWT Secret:', jwtConstants.secret);