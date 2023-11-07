export const TypeAction = {
  register: 'authentication/register',
  login: 'authentication/login',
  redirectToRoute: 'redirect/redirectToRoute',
  fetchTrainingsForYou: 'trainings/forYou',
  fetchTrainingsPopular: 'trainings/popular',
  fetchUser: 'user/user',
  fetchCompany: 'user/company'
} as const;
