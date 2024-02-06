import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import Todo from '../page/todo';
import Edit from '../page/edit';

const routes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/todo' element={<Todo />} />
          <Route path={'/todo/edit/:id'} element={<Edit/>} />
          <Route
            path=""
            element={
                <Navigate to="/todo" />
            }
          />
        </Routes>
      </BrowserRouter>
    );
};

export default routes;