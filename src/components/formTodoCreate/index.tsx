import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { createTodo } from '../../service/todo.ts';

const FormTodoCreate = () => {
  const toast = useToast();
  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'is required';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      onSubmit={(values, actions) => {
        createTodo(values).then(() => {
          toast({
            title: 'Account created.',
            description: 'We\'ve created your account for you.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          actions.resetForm();
          actions.setSubmitting(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });

      }}
    >
      {(props) => (
        <Form>
          <Field name='title' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Titulo da sua tarefa</FormLabel>
                <Input {...field} placeholder='Comprar leite' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='description' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Descrição da sua tarefa</FormLabel>
                <Input {...field} placeholder='Preciso fazer um bolo' />
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
        </Form>
      )}
    </Formik>
  );
};

export default FormTodoCreate;