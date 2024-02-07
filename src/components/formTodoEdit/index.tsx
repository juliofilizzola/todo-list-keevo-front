import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, useToast } from '@chakra-ui/react';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { updateTodo } from '../../service/todo.ts';
import { mapperStatus } from '../../utils/mapper-status.ts';
import { useNavigate } from 'react-router-dom';

interface IFormTodo {
  title: string;
  description: string;
  status: string;
  id: string;
}

const FormTodo = ({title, description, status, id}: IFormTodo) => {
  const navigate = useNavigate();
  const toast = useToast();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'is required';
    }
    return error;
  }

  function redirect() {
    navigate('/todo');
  }

  return (
    <>
      <Heading as ={'h2'}>Edite sua Todo</Heading>

      <Formik
        initialValues={{
          title: title,
          description: description,
          status: status,
        }}
        onSubmit={(values, actions) => {
          updateTodo(id, {
            ...values,
            status: mapperStatus(values.status)
          }).then(() => {
            toast({
              title: 'Todo Atulizado com sucesso',
              description: 'você acabou de atualizar a todo!',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            actions.resetForm();
            actions.setSubmitting(false);
            setTimeout(async () => {
              console.log('Success');
              navigate('/todo');
            }, 1000);
          });

        }}
      >
        {(props) => (
          <Form>
            <Field name='title' validate={validateName}>

              {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<{ name: string, surname: string }> }) => (
                <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                  <FormLabel>Titulo da sua tarefa</FormLabel>
                  <Input {...field} placeholder='Comprar leite' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='description' validate={validateName}>
              {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<{ name: string, surname: string }> }) => (
                <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                  <FormLabel>Descrição da sua tarefa</FormLabel>
                  <Input {...field} placeholder='Preciso fazer um bolo' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='status' validate={validateName}>
              {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<{ name: string, surname: string }> }) => (
                <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                  <FormLabel>Status da sua tarefa</FormLabel>
                  <Select {...field} name='status' placeholder='Selecione o status'>
                    <option>created</option>
                    <option>started</option>
                    <option>completed</option>
                  </Select>
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
            <br/>
            <Button mt={4} colorScheme={'red'} onClick={redirect}>Cancelar</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormTodo;