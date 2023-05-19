export class Course {
  _id!: string;
  title!: string;
  description!: string;
  modules!: [
    {
      title: string;
      description: string;
      videoURL: string;
      moduleAssets: [
        {
          title: string;
          description: string;
          type: string; // download link, image, video, audio, text, etc
          assetURL: string;
        }
      ];
      completed: boolean;
    }
  ];
  createdAt?: Date;
  updatedAt?: Date;
}