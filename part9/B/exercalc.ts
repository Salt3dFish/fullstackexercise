interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

/* type params = {
  params1: Array<number>;
  params2: number;
};


const checkParams = (args: Array<string>): params => {
  console.log(args, '\n', args.length);
  if (args.length < 4)
    throw new Error('args too less: at least 1 day & 1 target');
  const daysTime = [];
  let target!:number;
  for (let i = 2; i < args.length; i++) {
    const time = Number(args[i]);
    if (i === 2)
      target = time;
    if (isNaN(time))
      throw new Error('args must be num!');
    else
      daysTime.push(time);
  }
  return {
    params1: daysTime,
    params2: target
  };
}; */



const exerCalc = (days: Array<number>, target: number): result => {
  const average = days.reduce((sumtime, time) => sumtime + time, 0) / days.length;
  let rating: 1 | 2 | 3;
  let description!: string;
  if (average > target) {
    rating = 3;
  } else if (average >= target - 0.5) {
    rating = 2;
  } else {
    rating = 1;
  }
  switch (rating) {
    case 3: description = 'good enough'; break;
    case 2: description = 'not too bad but could be better'; break;
    case 1: description = 'you are too lazy 😟😟'; break;
    default: break;
  }
  return {
    periodLength: days.length,
    trainingDays: days.reduce((sum, time) => {
      return time === 0 ? sum : sum + 1;
    }, 0),
    success: rating > target ? true : false,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average,
  };
};

/* try {
  const { params1, params2 } = checkParams(process.argv);
  console.log(exerCalc(params1, params2));
} catch (error: unknown) {
  let errorMessage = 'Sth bad Happend.';
  if (error instanceof Error)
    errorMessage += '\n' + 'Error: ' + error.message;
  console.log(errorMessage);
} */

export { exerCalc as exerciseCalculator };