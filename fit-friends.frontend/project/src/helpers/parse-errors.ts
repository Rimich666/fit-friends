export const trainingErrorKeys = [
  'name',
  'level',
  'trainingtype',
  'trainingtime',
  'price',
  'caloriescount',
  'description',
  'gender',
  'video'
];

export const updateUserErrorKeys = [
  'name',
  'description',
];


export const parseKey = (error: string, keys: string[]) => {
  const words = error.split(' ').map((word) => word.startsWith('addition.') ?
    word.substring(9).toLowerCase() : word.toLowerCase());
  return words[words.findIndex((item) => keys.includes(item))];
};

export const parseErrors = (errorString: string, errorKeys: string[]) => {
  let parsed = {};
  const errors = JSON.parse(errorString) as Array<string>;
  if (!Array.isArray(errors)) {
    return parsed;
  }
  parsed = Object.fromEntries(errors.map((error) => ([parseKey(error, errorKeys), error])));
  return parsed;
};
