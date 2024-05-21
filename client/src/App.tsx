import useSWR from 'swr';
import { Box, List, ListItem, MantineProvider } from '@mantine/core';
import AddTodo from './components/AddToDo';
import '@mantine/core/styles.css';

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = 'http://127.0.0.1:4000'
const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export function App() {

  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)

  return (
    <MantineProvider forceColorScheme="dark">
         <Box><List spacing="xs" size='sm' mb={12} center>{data?.map((todo)=> {
          return <ListItem key={`todo__${todo.id}`}>
            {todo.title}
          </ListItem>
         })}</List></Box>
         <AddTodo mutate={mutate} />
    </MantineProvider>
  );
}

export default App;

