import {reviewsData} from './reviews-data';

export const makeFakeFeedbacks = () =>
  reviewsData.map((review, index) => ({
    id: review.id,
    author: {
      name: review.name,
      avatarPath: review.avatar,
    },
    authorId: 'id',
    trainingId: 25,
    rating: review.rating,
    text: review.comment,
    createDate: new Date()
  }));

