type Constraint = {
  max?: number,
  min?: number
}

type Constraints = {
  user: {[field: string]: Constraint},
  training: {[field: string]: Constraint},
  feedback: {[field: string]: Constraint},
  order: {[field: string]: Constraint},
  notify: {[field: string]: Constraint},
}

export const validationConstraints : Constraints = {
  user: {
    name: {max: 15, min: 1},
    password: {max: 12, min: 6},
    description: {max: 140, min: 10},
    trainingCalories: {max: 5000, min: 1000},
    daysCalories: {max: 5000, min: 1000},
    merits: {max: 140, min: 10},
    trainingType: {max: 3}
  },
  training: {
    name: {max: 15, min: 1},
    price: {min: 0},
    trainingCalories: {max: 5000, min: 1000},
    description: {max: 140, min: 10},
  },
  feedback: {
    rating: {max: 5, min: 1},
    text: {max: 1024, min: 100},
  },
  order: {
    count: {max: 50, min: 1},
  },
  notify: {
    text: {max: 140, min: 10}
  }
};
