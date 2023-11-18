export const TypeAction = {
  register: 'authentication/register',
  login: 'authentication/login',
  redirectToRoute: 'redirect/redirectToRoute',
  fetchTrainingsForYou: 'trainings/forYou',
  fetchTrainingsPopular: 'trainings/popular',
  fetchUser: 'user/user',
  fetchCompany: 'user/company',
  updateUser: 'user/update',
  createTraining: 'training/create',
  fetchCoachTrainings: 'trainings/coach',
  fetchCatalogTrainings: 'trainings/catalog',
  fetchTraining: 'trainings/card',
  fetchFeedbacks: 'feedback/feedbacks',
  fetchBalance: 'balance/balance',
  createOrder: 'order/order',
  addBalance: 'balance/add',
  subBalance: 'balance/sub'
} as const;
