import axios from 'axios';

const todosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export async function getTodos () {
  const response = await todosApi.get('/todos');
  return response.data;
}

export async function addTodo (todo) {
  const response = await todosApi.post('/todos', todo);
  return response.data;
}

export async function editTodo (todo) {
  const response = await todosApi.patch(`/todos/${todo.id}`, todo);
  return response.data;
}

export async function removeTodo ({ id }) {
  const response = await todosApi.delete(`/todos/${id}`, id);
  return response.data;
}

export default todosApi;