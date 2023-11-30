import {parseKey} from './parse-errors';

const Mapping = {
  email: {
    class: 'user',
    field: 'email',
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
  trainingCalories: {
    class: 'questionnaire',
    field: 'trainingCalories',
  },
  daysCalories: {
    class: 'questionnaire',
    field: 'daysCalories',
  },
  trainingType: {
    class: 'questionnaire',
    field: 'trainingType',
  },
  description: {
    field: 'description',
    class: ''
  }
};


export const parseRegisterErrors = (errorString: string) => {
  let parsed = {user: {}, questionnaire: {}};
  const errors = JSON.parse(errorString) as Array<string>;
  if (!Array.isArray(errors)) {
    return parsed;
  }
  parsed = errors.map((error) => ([parseKey(error, Object.keys(Mapping)), error]))
    .reduce((acc, curr) => ({...acc, [Mapping[curr[0] as keyof typeof Mapping].class]:
          {...acc[Mapping[curr[0] as keyof typeof Mapping].class as keyof typeof parsed] ,
            [Mapping[curr[0] as keyof typeof Mapping].field]: curr[1]}}),
    parsed);
  return parsed;
};
