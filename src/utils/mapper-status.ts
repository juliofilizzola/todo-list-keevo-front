import { EStatusTodo } from '../service/todo.ts';

export const mapperStatus = (status: string): EStatusTodo => EStatusTodo[status as keyof typeof EStatusTodo];

export const mapperStatusToStr = (status: EStatusTodo): string => {
  const statusStr = {
    [EStatusTodo.completed]: 'completo',
    [EStatusTodo.started]: 'iniciado',
    [EStatusTodo.created]: 'criado',
  };

  return statusStr[status];
};