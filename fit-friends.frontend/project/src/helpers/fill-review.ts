import {FeedbackInterface} from '../types/feedback.interface';
import {ReviewInterface} from '../types/review.interface';

export const fillReview = (feedback: FeedbackInterface): ReviewInterface => ({
  id: feedback.id,
  name: feedback.author.name,
  avatar: feedback.author.avatarPath,
  rating: feedback.rating,
  comment: feedback.text,
});
