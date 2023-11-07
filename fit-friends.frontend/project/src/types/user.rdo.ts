export interface SportsmanRdo {
  trainingTime: string;
  trainingCalories: number;
  daysCalories: number;
}

export interface CoachRdo {
  certificatePath: string;
  merits: string;
}


export interface UserRdo {
  id: string;
  email: string;
  name: string;
  gender: string;
  createDate: Date;
  birthDate: Date;
  role: string;
  description: string;
  location: string;
  imagePath: string;
  createData: Date;
  level: string;
  trainingType: string[];
  isReady: boolean;
  avatarPath: string;
  addition: CoachRdo | SportsmanRdo;
}
