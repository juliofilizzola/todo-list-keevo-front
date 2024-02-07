import { useEffect, useMemo, useState } from 'react';
import { deleteTodo, EStatusTodo, getTodo, IPaginationTodo } from '../../service/todo.ts';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { mapperStatusColor } from '../../utils/mapper-status-color.ts';
import FormTodoCreate from '../../components/formTodoCreate';
import Pagination from '../../components/pagination';
import { mapperStatus, mapperStatusToStr } from '../../utils/mapper-status.ts';

const Todo = () => {
  const [todoList, setTodoList] = useState<IPaginationTodo>();
  const [filterStatus, setFilterStatus] = useState<EStatusTodo>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handlerGetTodo = async (page: number) => {
    const data = await getTodo({page, limit: 10, status: filterStatus});
    setTodoList(data);
  };

  const deletedTodo = (id: string) => {
    deleteTodo(id).then(() => {
      toast({
        title: 'deletado com sucesso',
        description: 'sua todo foi deletada.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
    }, 2000);
    }).catch((e) => {
      console.error(e);
      toast({
        title: 'Erro em deletar',
        description: 'Não consigo deletar sua todo',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    handlerGetTodo(1, ).then();
  }, [filterStatus]);
  const createTodoIsOpen = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crie sua Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {FormTodoCreate()}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const filterTodo = (status: string) => {
    setFilterStatus(mapperStatus(status));
  };
  useMemo(() => {
    handlerGetTodo(1).then();
    return () => {
      console.log('update');
    };
  },[filterStatus]);

  useEffect(() => {
    handlerGetTodo(1).then();
    return () => {
      console.log('init');
    };
  },[]);

  return (
    <>
      <Heading as={'h1'}>Todo List</Heading>
      <Button margin='5' color='white' colorScheme='green' onClick={onOpen}>Crie um item na sua lista</Button>
      {createTodoIsOpen()}
      <Divider marginBottom={'5'} maxW='sm'/>

      <Select onChange={ e => filterTodo(e.target.value)} maxW='sm' minW={'200px'} placeholder='Filtre por: ' gap={3}>
        <option value='created'>Criado</option>
        <option value='started'>Iniciado</option>
        <option value='completed'>Finalizado</option>
      </Select>

      <SimpleGrid spacing={10} flexWrap='wrap' columns={{ base: 1, md: 4 }}>
          {todoList?.data.map((todo, index) => (
            <Card key={index} justifyContent={'space-between'} maxW='sm' minW={'200px'}>
              <CardBody>
                <Stack mt='6' spacing='3'>
                  <Box alignItems='center' >
                    <Heading size='md'>{todo.title}</Heading>
                    <Text >{todo.description}</Text>
                    <Badge color='black' colorScheme={mapperStatusColor(todo.status)}>{mapperStatusToStr(todo.status)}</Badge>
                  </Box>
                  <CardFooter
                    justify='space-around'
                    flexWrap='wrap'
                    gap={2}
                    justifyContent='space-around'
                    bottom={0}
                    position= 'inherit'
                    sx={{
                      '& > div': {
                        minW: '30px',
                        margin: '0 12px',
                        bottom: 0,
                        marginTop:'auto',
                        position: 'absolute',
                      },
                    }}
                  >

                      <Button colorScheme='blue'>
                        <Link href={`/todo/edit/${todo.id}`}>Editar</Link>
                      </Button>

                      <Button onClick={() => deletedTodo(todo.id)} colorScheme='red'>
                        Excluir
                      </Button>
                  </CardFooter>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid  >
      <Pagination onPageChange={handlerGetTodo} itemsPerPage={10} totalItems={todoList?.count || 0}/>
    </>
  );
};

export default Todo;