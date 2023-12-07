import {TrainingType, UserLocation} from '../enums';
import {FriendInterface} from '../types/friend.interface';

export const coachFriends: FriendInterface[] = [
  {
    id: '65329a910b645fb5e70f5900',
    name: 'Виктория',
    avatar: '/img/content/thumbnails/friend-14.jpg',
    location: UserLocation.pioneer,
    trainingTypes: [TrainingType.aerobics],
    isReady: true,
    isRequest: true,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5901',
    name: 'Кристина',
    avatar: '/img/content/thumbnails/friend-15.jpg',
    location: UserLocation.petrogradskaya,
    trainingTypes: [TrainingType.box],
    isReady: true,
    isRequest: true,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5902',
    name: 'Алексей',
    avatar: '/img/content/thumbnails/friend-16.jpg',
    location: UserLocation.sportive,
    trainingTypes: [TrainingType.crossfit],
    isReady: true,
    isRequest: true,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5903',
    name: 'Катерина',
    avatar: '/img/content/thumbnails/friend-17.jpg',
    location: UserLocation.regional,
    trainingTypes: [TrainingType.aerobics],
    isReady: false,
    isRequest: false,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5904',
    name: 'Ксения',
    avatar: '/img/content/thumbnails/friend-18.jpg',
    location: UserLocation.starry,
    trainingTypes: [TrainingType.aerobics, TrainingType.box],
    isReady: true,
    isRequest: false,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5905',
    name: 'Алиса',
    avatar: '/img/content/thumbnails/friend-19.jpg',
    location: UserLocation.petrogradskaya,
    trainingTypes: [TrainingType.aerobics, TrainingType.box, TrainingType.stretching],
    isReady: false,
    isRequest: false,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5906',
    name: 'Алёна',
    avatar: '/img/content/thumbnails/friend-20.jpg',
    location: UserLocation.starry,
    trainingTypes: [TrainingType.crossfit, TrainingType.stretching],
    isReady: true,
    isRequest: false,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5907',
    name: 'София',
    avatar: '/img/content/thumbnails/friend-21.jpg',
    location: UserLocation.petrogradskaya,
    trainingTypes: [TrainingType.crossfit, TrainingType.box],
    isReady: false,
    isRequest: false,
    idRequest: ''
  },
  {
    id: '65329a910b645fb5e70f5908',
    name: 'Валерия',
    avatar: '/img/content/thumbnails/friend-09.jpg',
    location: UserLocation.sportive,
    trainingTypes: [TrainingType.stretching, TrainingType.box],
    isReady: true,
    isRequest: false,
    idRequest: ''
  },
];
