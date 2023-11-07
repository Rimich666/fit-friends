export interface Addition {
  merits?: string;
  trainingTime?: string;
  trainingCalories?: number;
  daysCalories?: number;
}

export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  gender: string;
  birthDate: Date;
  role: string;
  description: string;
  location: string;
  level: string;
  trainingType: string[];
  isReady: boolean;
  addition: Addition;
}
