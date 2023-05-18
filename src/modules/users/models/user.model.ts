export class User {
  _id!: string;
  email!: string;
  name!: string;
  phone?: string;
  
  staltedOTP?: string; //??? should this be stored with the user or with the session or both???
  OTPExpiration?: Date; // OTP stored on the clients browser will be sent over to the server along with the current date and time, and the server will check if the OTP is still valid
  sessionId?: string; //??? should this be stored with the user or with the session or both???

  purchasedCourses?: [
      {
          courseId: string;
          purchaseId: string;
          purchaseDate: Date;
          purchasePrice: number;
          progress: number[] // when a module is started it is saved in the array as the percentage out of 100 at the index in the array that is the index of the module
      }
  ];

  createdAt?: Date;
  updatedAt?: Date;
}