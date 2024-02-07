import FormTodo from '../../components/formTodoEdit';
import { useEffect, useState } from 'react';
import { getOneTodo, ITodo } from '../../service/todo.ts';
import { Skeleton, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id} = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerGetTodo = async () => {
    if (id) {
      const data = await getOneTodo(id);
      console.log(data, 'data');
      setTodo(data);
      setIsLoading(true);
    } else {
      return;
    }

  };
  useEffect(() => {
    handlerGetTodo().then();
    console.log(todo);
    return () => {
      console.log('unmount');
    };
  },[id]);

  return(
    <div>
      {
        isLoading && todo? <FormTodo status={todo?.status} title={todo?.title} id={todo?.id} description={todo?.description} /> : <div>
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>

        </div>
      }
    </div>
  );
};

export default Edit;