import {RegisterUserInterface} from '../types/auth/register-user.interface';
import {QuestionnaireInterface} from '../types/auth/questionnaire.interface';
import {RegisterDto} from '../types/auth/register.dto';
import {Role} from '../enums';

export const makeRegisterPayload = (user: RegisterUserInterface, questionnaire: QuestionnaireInterface) => {
  const payload = new FormData();
  const isCoach = user.role === Role.coach;
  const addition = isCoach ? {merits: questionnaire.merits} :
    {
      trainingTime: questionnaire.trainingTime,
      trainingCalories: questionnaire.daysCalories,
      daysCalories: questionnaire.daysCalories
    };

  const dto: RegisterDto = {
    email: user.email,
    name: user.name,
    password: user.password,
    gender: user.gender,
    birthDate: user.birthDate,
    role: user.role,
    description: 'Привет бэкенду от 10 до 140 символов',
    location: user.location,
    level: questionnaire.level,
    trainingType: questionnaire.trainingType,
    isReady: isCoach ? questionnaire.isReady : true,
    addition: addition
  };
  payload.append('user', JSON.stringify(dto));
  payload.append('avatar', user.avatar);
  if (isCoach) {
    questionnaire.certificate.forEach((certificate) => {
      payload.append('certificate', certificate);
    });
  }
  return payload;
};
