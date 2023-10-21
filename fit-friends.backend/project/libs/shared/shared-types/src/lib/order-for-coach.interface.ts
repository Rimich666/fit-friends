export interface OrderForCoachInterface {
  name: string;
  backgroundPath: string;
  level: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesCount: number;
  description: string;
  gender: string;
  videoId?: string;
  videoPath?: string;
  rating: number;
  coachId: string;
  spec: boolean;
  createDate: Date;
  orderId: number;
  count: number;
  total: number;
  trainingId: number;
}
