export interface InputAttributes {
  type: string;
  class: string;
  label: string;
  name: string;
  text: string;
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
    text: ''
  },
  loginPassword: {
    type: 'password',
    name: 'password',
    class: 'sign-in__input',
    label: 'Пароль',
    text: ''
  },
  name: {
    type: 'text',
    name: 'name',
    class: '',
    label: 'Имя',
    text: ''
  },
  registerEmail: {
    type: 'email',
    name: 'email',
    class: '',
    label: 'E-mail',
    text: ''
  },
  birthday: {//max="2099-12-31"
    type: 'date',
    name: 'birthday',
    class: '',
    label: 'Дата рождения',
    text: ''
  },
  registerPassword: {
    type: 'password',
    name: 'password',
    class: 'sign-in__input',
    label: 'Пароль',
    autoComplete: 'off',
    text: ''
  },
  trainingCalories: {
    type: 'number',
    name: 'calories-lose',
    class: 'custom-input--with-text-right questionnaire-user__input',
    label: '',
    text: 'ккал'
  },
  daysCalories: {
    type: 'number',
    name: 'calories-waste',
    class: 'custom-input--with-text-right questionnaire-user__input',
    label: '',
    text: 'ккал'
  },
  trainingName: {
    type: 'text',
    name: 'training-name',
    class: 'create-training__input',
    label: 'Название тренировки',
    text: ''
  },
  cardTrainingName: {
    type: 'text',
    name: 'training',
    class: 'training',
    label: '',
    text: ''
  },
  cardTrainingPrice: {
    type: 'number',
    name: 'price',
    class: 'price',
    label: 'Стоимость',
    text: ''
  },
  trainingCaloriesTraining: {
    type: 'number',
    name: 'calories',
    class: 'custom-input--with-text-right',
    label: 'Сколько калорий потратим',
    text: 'ккал'
  },
  price: {
    type: 'number',
    name: 'price',
    class: 'custom-input--with-text-right',
    label: 'Стоимость тренировки',
    text: '₽'
  },
};
