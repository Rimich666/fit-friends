import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import {AppRoute} from '../../app-route';
import {render, screen} from '@testing-library/react';
import * as token from '../../servises/token';
import {Role} from '../../enums';
import {NameSpace} from '../../settings';
import {coachFriends} from '../../mocks/coach-friends';
import {defaultState} from '../../mocks/states/default-state';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing for coach', () => {
  beforeEach(() => {
    jest.spyOn(token, 'getSelfRole').mockReturnValue(Role.coach);
    jest.spyOn(token, 'getSelfId').mockReturnValue('65329a910b645fb5e70f5f2d');
  });

  it('should render navigate to "/"', () => {
    const store = mockStore({});
    history.push(AppRoute.Root);
    render(fakeApp(store));
    expect(screen.getByText('Есть аккаунт?')).toBeInTheDocument();
  });
  it('should render navigate to "/main"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Main);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/office"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Office);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Coach);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/sportsmanOffice"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Sportsman);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/coachTrainings"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CoachTrainings);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Мои тренировки Фильтр')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/createTraining"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CreateTraining);
    render(fakeApp(store));
    expect(screen.getByText('Создание тренировки')).toBeInTheDocument();
  });
  it('should render navigate to "/Friends"', () => {
    const store = mockStore({...defaultState, [NameSpace.Friend]: {friends: coachFriends}});
    history.push(AppRoute.Friends);
    render(fakeApp(store));
    expect(screen.getAllByText('Запрос на персональную тренировку')).toHaveLength(3);
  });
  it('should render navigate to "/coachOffice/orders"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CoachOrders);
    render(fakeApp(store));
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
  });
  it('should render navigate to "/main/catalog"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.TrainingCatalog);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Мои тренировки Фильтр')).toBeInTheDocument();
  });
  it('should render navigate to "/main/userCatalog"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.UserCatalog);
    render(fakeApp(store));
    expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/userOffice/purchases"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Purchases);
    render(fakeApp(store));
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
  });
  it('should render navigate to "/main/training/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.SportsmanTraining}/25`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка тренировки')).toBeInTheDocument();
    expect(screen.getAllByText('Сохранить')).toHaveLength(2);
    expect(screen.getByText('Удалить')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/training/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.CoachTraining}/25`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка тренировки')).toBeInTheDocument();
    expect(screen.getAllByText('Сохранить')).toHaveLength(2);
    expect(screen.getByText('Удалить')).toBeInTheDocument();
  });
  it('should render navigate to "/main/userCard/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.UserCard}/65329a910b645fb5e70f5f2d`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка пользователя')).toBeInTheDocument();
    expect(screen.queryByText('Посмотреть сертификаты')).toBeNull();
  });
  it('should render navigate to "/main/coachCard/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.CoachCard}/65329a910b645fb5e70f5f2d`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка пользователя роль тренер')).toBeInTheDocument();
  });
});
describe('Application Routing for sportsman', () => {
  beforeEach(() => {
    jest.spyOn(token, 'getSelfRole').mockReturnValue(Role.sportsman);
    jest.spyOn(token, 'getSelfId').mockReturnValue('65329a910b645fb5e70f5f2d');
    jest.spyOn(token, 'getToken').mockReturnValue('token');
  });

  it('should render navigate to "/main"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Main);
    render(fakeApp(store));
    expect(screen.getByText('Специально подобрано для вас')).toBeInTheDocument();
  });
  it('should render navigate to "/office"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Office);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Coach);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/sportsmanOffice"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Sportsman);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/coachTrainings"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CoachTrainings);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/createTraining"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CreateTraining);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/Friends"', () => {
    const store = mockStore({...defaultState, [NameSpace.Friend]: {friends: coachFriends}});
    history.push(AppRoute.Friends);
    render(fakeApp(store));
    expect(screen.getAllByText('Запрос на персональную тренировку')).toHaveLength(3);
  });
  it('should render navigate to "/coachOffice/orders"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.CoachOrders);
    render(fakeApp(store));
    expect(screen.getByText('План на день, ккал')).toBeInTheDocument();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });
  it('should render navigate to "/main/catalog"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.TrainingCatalog);
    render(fakeApp(store));
    expect(screen.getByText('Каталог тренировок')).toBeInTheDocument();
    expect(screen.getByText('Мои тренировки Фильтр')).toBeInTheDocument();
  });
  it('should render navigate to "/main/userCatalog"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.UserCatalog);
    render(fakeApp(store));
    expect(screen.getByText('Каталог пользователей')).toBeInTheDocument();
  });
  it('should render navigate to "/userOffice/purchases"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Purchases);
    render(fakeApp(store));
    expect(screen.getByText('Мои покупки')).toBeInTheDocument();
  });
  it('should render navigate to "/main/training/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.SportsmanTraining}/25`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка тренировки')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Приступить')).toBeInTheDocument();
  });
  it('should render navigate to "/coachOffice/training/id"', () => {
    const store = mockStore(defaultState);
    history.push(`${AppRoute.CoachTraining}/25`);
    render(fakeApp(store));
    expect(screen.getByText('Карточка тренировки')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Приступить')).toBeInTheDocument();
  });
});
describe('Authentication Routing', () => {
  beforeEach(() => {
    jest.spyOn(token, 'getSelfRole').mockReturnValue(undefined as unknown as Role);
  });
  it('should render navigate to "/login"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Login);
    render(fakeApp(store));
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });
  it('should render navigate to "/register"', () => {
    const store = mockStore(defaultState);
    history.push(AppRoute.Register);
    render(fakeApp(store));
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });
});
