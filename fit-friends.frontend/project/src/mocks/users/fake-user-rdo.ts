import {Gender, Level, Role, TrainingType, UserLocation} from '../../enums';
import {RegisterDto} from '../../types/auth/register.dto';

export const fakeUserRdo = {
  id: 'id',
  email: 'email@email.email',
  name: 'Валерия',
  gender: Gender.female,
  createDate: new Date(),
  birthDate: new Date(),
  role: Role.coach,
  description: `Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу.
     Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками. Провожу как индивидуальные
     тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!`,
  location: UserLocation.starry,
  imagePath: 'imagePath',
  createData: new Date(),
  level: Level.professional,
  trainingType: [TrainingType.box, TrainingType.crossfit, TrainingType.power, TrainingType.yoga],
  isReady: true,
  avatarPath: 'avatarPath',
  addition: {
    certificatePath: [{path: 'certificate1', ext: ''}, {path: 'certificate1', ext: 'certificate2'}, {path: 'certificate1', ext: 'certificate3'}],
    merits: 'string merits',
  },
  isFriend: true,
  isRequest: true,
  idRequest: 'idRequest',
};
