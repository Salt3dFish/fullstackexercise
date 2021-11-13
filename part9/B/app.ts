/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { bmi } from './bmicalc';
import { exerciseCalculator } from './exercalc';

const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('hello fullstack');
});

app.get('/bmi', (req, res, next) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) {
    next({ name: 'invalid queries', message: 'malformatted parameters' });
  }
  res.json({
    weight,
    height,
    bmi: bmi(height, weight)
  });
});

app.post('/exercises', (req, res, next) => {
  const { daily_exercises, target }: { daily_exercises: Array<number>, target: number } = req.body;
  if (!daily_exercises || !target) {
    next({ name: 'invalid params', message: 'parameters missing' });
  } else if (isNaN(target) || !Array.isArray(daily_exercises)){
    next({name:'invalid params',message:'unformatted parameters'});
  } else {
    res.json(JSON.stringify(exerciseCalculator(daily_exercises,target)));
  }
});



const errorHandler = (error: { name: string, message: string }, _req: any, res: any, next: any) => {
  console.log(error);
  if (error.name === 'invalid queries') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'invalid params') {
    return res.status(400).send({ error: error.message });
  }
  next();
};


const unknownEndpoint = (_req: any, res: any) => {
  return res.status(404).end();
};

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;