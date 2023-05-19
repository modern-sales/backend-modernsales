export class User {
  _id!: string;
  email!: string;
  name!: string;
  phone?: string;
  
  sessionId?: string;
  sessionExpiresAt?: Date;

  isAffiliate?: boolean;
  affiliateCodeId?: string;

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