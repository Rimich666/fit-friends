import {parseKey} from './parse-errors';

const Mapping = {
  email: {
    class: 'user',
    field: 'email',
  },
  avatar: {
    class: 'user',
    field: 'avatar',
  },
  name: {
    class: 'user',
    field: 'name',
  },
  password: {
    class: 'user',
    field: 'password',
  },
  location: {
    class: 'user',
    field: 'location',
  },
  trainingcalories: {
    class: 'questionnaire',
    field: 'trainingCalories',
  },
  dayscalories: {
    class: 'questionnaire',
    field: 'daysCalories',
  },
  trainingtype: {
    class: 'questionnaire',
    field: 'trainingType',
  },
  description: {
    field: 'description',
    class: ''
  },
  merits: {
    field: 'merits',
    class: 'questionnaire'
  },
  certificate: {
    field: 'merits',
    class: 'questionnaire'
  }
};


export const parseRegisterErrors = (errorString: string) => {
  let parsed = {user: {}, questionnaire: {}};
  const errors = JSON.parse(errorString) as Array<string>;
  if (!Array.isArray(errors)) {
    return parsed;
  }
  parsed = errors.map((error) => ([parseKey(error, Object.keys(Mapping)), error])).filter((item) => item[0] !== undefined)
    .reduce((acc, curr) =>
      ({...acc, [Mapping[curr[0] as keyof typeof Mapping].class]:
          {...acc[Mapping[curr[0] as keyof typeof Mapping].class as keyof typeof parsed] ,
            [Mapping[curr[0] as keyof typeof Mapping].field]: curr[1]}}),
    parsed);
  return parsed;
};
