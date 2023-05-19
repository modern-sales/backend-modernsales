export class Course {
  _id!: string;
  title!: string;
  description!: string;

  basePrice!: number;
  discountPrice!: number;

  modules!: {
    title?: string;
    description?: string;
    videoURL?: string;
    moduleAssets: {
      title?: string;
      description?: string;
      type: string; // download link, image, video, audio, text, etc
      assetURL: string;
    }[];
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}