import {NameSpace} from "../settings";
import {certificates} from './certificates';
import {user} from './user';
import {validationConstraints} from '../validation-constraints';
import {RangeConstraint} from '../types/states/training-state';
import {cardData} from './card-data';
import {trainingData} from './training-data';
import {specialProps} from './special-offers';
import {userCardData} from './user-card-data';
import {AppRoute} from '../app-route';
import {ordersData} from './my-orders';
import {reviewsData} from './reviews-data';
import {coachFriends} from './coach-friends';

export const defaultState = {
  [NameSpace.Register]: {
    isCurrentUserLoaded: true,
    certificate: certificates,
    currentUser: user,
    registerErrors: {}
  },
  [NameSpace.Notification]: {notifications: []},
  [NameSpace.Training]: {
    range : {
      calories: {...validationConstraints.training.caloriesCount as RangeConstraint},
      price: {...validationConstraints.training.price as RangeConstraint, max: NaN},
      rating: {...validationConstraints.training.rating as RangeConstraint}
    },
    coachTrainings: cardData.map((item) => ({...item, trainingType: item.type})),
    catalogTrainings: cardData.map((item) => ({...item, trainingType: item.type})),
    purchases: cardData.map((item) => ({...item, trainingType: item.type})),
    trainingCard: trainingData,
    forYouTrainings: cardData.map((item) => ({...item, trainingType: item.type})),
    specialOffers: specialProps,
    popularTrainings: cardData.map((item) => ({...item, trainingType: item.type})),
  },
  [NameSpace.User]: {
    catalog: userCardData,
    isUserLoaded: true,
    user: user,
    isLoading: false,
    company: userCardData.map((item) => ({...item, trainingType: item.specialization}))
  },
  [NameSpace.Popup]: {pages: 2},
  [NameSpace.Back]: {back: AppRoute.Main},
  [NameSpace.Orders]: {orders: ordersData},
  [NameSpace.Balance]: {balance: 0},
  [NameSpace.Reviews]: {reviews: reviewsData},
  [NameSpace.Friend]: {friends: coachFriends}
};
