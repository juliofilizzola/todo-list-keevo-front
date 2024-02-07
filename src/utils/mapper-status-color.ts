import { EStatusTodo } from '../service/todo.ts';

export const mapperStatusColor = (status: EStatusTodo): string => {
  const color = {
    [EStatusTodo.completed]: 'green',
    [EStatusTodo.started]: 'red',
    [EStatusTodo.created]: 'yellow',
  };

  return color[status];
};