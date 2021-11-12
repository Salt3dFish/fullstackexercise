/* type params = {
  params1: number;
  params2: number;
}

const checkNums = (args: Array<string>): params => {
  // console.log(args);
  console.log('shit');
  if (args.length !== 4)
    throw new Error('args must be 2')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      params1: Number(args[2]),
      params2: Number(args[3])
    }
  } else {
    throw new Error('args must be num')
  }
} */




const bmiCalculator = (hei: number, wei: number): string => {
  const index = wei / hei / hei * 10000;
  if (index < 16) {
    return "Underweight (Severe thinness)";
  } else if (index < 16.9) {
    return "Underweight (Moderate thinness) ";
  } else if (index < 18.4) {
    return "Mild thinness";
  } else if (index < 24.9) {
    return "Normal (healthy weight)";
  } else if (index < 29.9) {
    return "Overweight (Pre-obese)";
  } else if (index < 34.9) {
    return "Obese (Class 1)";
  } else if (index < 39.9) {
    return "Obese (Class 2)";
  } else if (index >= 40) {
    return "Obese (Class 3)";
  } else {
    return "Invalid params";
  }
};

/* try {
  const { params1, params2 } = checkNums(process.argv)
  console.log(bmiCalculator(params1, params2))
} catch (error: unknown) {
  let errorMessage = 'sth bad happend.'
  if (error instanceof Error)
    errorMessage += '\nError:' + error.message
  console.log(errorMessage)
} */

export {bmiCalculator as bmi};