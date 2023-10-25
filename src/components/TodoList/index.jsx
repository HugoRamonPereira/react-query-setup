import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getTodos, addTodo } from '../../api/api';

export default function TodoList() {
  const queryClient = useQueryClient();

  // The hook useQuery was used here because we are making a query to get the todos
  // The first parameter of useQuery is a string to manage cache
  // We are using the method getTodos from the API file using Axios
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  });


  const { mutateAsync } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }
  return (
    <main>
      <h1>Todo List</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>;

      <button onClick={() => {
        mutateAsync({
          id: Math.random(),
          title: 'Finish article'
        });
      }}>
        Add todo
      </button>
    </main>
  );
}