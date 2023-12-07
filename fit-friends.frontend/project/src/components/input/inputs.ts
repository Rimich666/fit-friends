export interface InputAttributes {
  type: string;
  class: string;
  label: string;
  name: string;
  text: string;
  testId: string;
  autoComplete?: string;
}

type InputsType = {
  loginEmail: InputAttributes;
  loginPassword: InputAttributes;
  name: InputAttributes;
  registerEmail: InputAttributes;
  birthday: InputAttributes;
  registerPassword: InputAttributes;
  trainingCalories: InputAttributes;
  daysCalories: InputAttributes;
  trainingName: InputAttributes;
  trainingCaloriesTraining: InputAttributes;
  price: InputAttributes;
  cardTrainingName: InputAttributes;
  cardTrainingPrice: InputAttributes;
}

export const Inputs: InputsType = {
  loginEmail: {
    type: 'email',
    name: 'email',
    class: 'sign-in__input',
    label: 'E-mail',
    text: '',
    testId: 'login-email',
  },
  loginPassword: {
    type: 'password',
    name: 'password',
    class: 'sign-in__input',
    label: 'Пароль',
    text: '',
    testId: 'login-password',
  },
  name: {
    type: 'text',
    name: 'name',
    class: '',
    label: 'Имя',
    text: '',
    testId: 'name',
  },
  registerEmail: {
    type: 'email',
    name: 'email',
    class: '',
    label: 'E-mail',
    text: '',
    testId: 'register-email',
  },
  birthday: {//max="2099-12-31"
    type: 'date',
    name: 'birthday',
    class: '',
    label: 'Дата рождения',
    text: '',
    testId: 'birthday',
  },
  registerPassword: {
    type: 'password',
    name: 'password',
    class: 'sign-in__input',
    label: 'Пароль',
    autoComplete: 'off',
    text: '',
    testId: 'register-password',
  },
  trainingCalories: {
    type: 'number',
    name: 'calories-lose',
    class: 'custom-input--with-text-right questionnaire-user__input',
    label: '',
    text: 'ккал',
    testId: 'training-calories',
  },
  daysCalories: {
    type: 'number',
    name: 'calories-waste',
    class: 'custom-input--with-text-right questionnaire-user__input',
    label: '',
    text: 'ккал',
    testId: 'days-calories',
  },
  trainingName: {
    type: 'text',
    name: 'training-name',
    class: 'create-training__input',
    label: 'Название тренировки',
    text: '',
    testId: 'training-name',
  },
  cardTrainingName: {
    type: 'text',
    name: 'training',
    class: 'training',
    label: '',
    text: '',
    testId: 'card-trainingName',
  },
  cardTrainingPrice: {
    type: 'number',
    name: 'price',
    class: 'price',
    label: 'Стоимость',
    text: '',
    testId: 'card-training-price',
  },
  trainingCaloriesTraining: {
    type: 'number',
    name: 'calories',
    class: 'custom-input--with-text-right',
    label: 'Сколько калорий потратим',
    text: 'ккал',
    testId: 'training-calories-training',
  },
  price: {
    type: 'number',
    name: 'price',
    class: 'custom-input--with-text-right',
    label: 'Стоимость тренировки',
    text: '₽',
    testId: 'price',
  },
};
