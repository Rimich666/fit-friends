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

const parseKey = (error: string) => {
  const words = error.split(' ').map((word) => word.startsWith('addition.') ?
    word.substring(9) : word);
  return words[words.findIndex((item) => Object.keys(Mapping).includes(item))];
};


export const parseRegisterErrors = (errorString: string) => {
  let parsed = {user: {}, questionnaire: {}};
  const errors = JSON.parse(errorString) as Array<string>;
  if (!Array.isArray(errors)) {
    return parsed;
  }
  parsed = errors.map((error) => ([parseKey(error), error]))
    .reduce((acc, curr) => ({...acc, [Mapping[curr[0] as keyof typeof Mapping].class]:
          {...acc[Mapping[curr[0] as keyof typeof Mapping].class as keyof typeof parsed] ,
            [Mapping[curr[0] as keyof typeof Mapping].field]: curr[1]}}),
    parsed);
  return parsed;
};

export const parseUpdateUserErrors = (errorString: string) => {
  let parsed = {};
  const errors = JSON.parse(errorString) as Array<string>;
  if (!Array.isArray(errors)) {
    return parsed;
  }
  parsed = Object.fromEntries(errors.map((error) => ([parseKey(error), error])));
  return parsed;
};
