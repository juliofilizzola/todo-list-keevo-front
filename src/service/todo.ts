import api from './axios.ts';

export enum EStatusTodo {
  created = 'created',
  started = 'started',
  completed = 'completed',
}
export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: EStatusTodo;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateTodo {
  title: string;
  description: string;
}
export interface IPaginationTodo {
  data: ITodo[];
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
export interface IUpdateTodo {
  title: string;
  description: string;
  status: EStatusTodo;
}
export const getTodo = async (body?: {page?: number, limit?: number, status?: EStatusTodo}): Promise<IPaginationTodo> => {
  if (body?.page && body?.limit || body?.status) {
    const {data} = await api.get('/todo', {
      params: {
        page: body?.page,
        limit: body?.limit,
        status: body?.status,
      },
    });
    return data;
  }
  const {data} = await api.get('/todo');
  return data;
};

export const getOneTodo = async (id: string): Promise<ITodo> => {
  const {data} = await api.get(`/todo/${id}`);
  return data;
};

export const createTodo = async (body: ICreateTodo): Promise<ITodo> => {
  const {data} = await api.post('/todo', body);
  return data;
};

export const updateTodo = async (id: string, body: IUpdateTodo): Promise<ITodo> => {
  const {data} = await api.patch(`/todo/${id}`, body);
  return data;
};

export const deleteTodo = async (id: string): Promise<string> => {
  const {data} = await api.delete(`/todo/${id}`);
  return data;
};