import './App.css';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from '@aws-amplify/api';
import { listTodos } from './graphql/queries';
import { createTodo, deleteTodo, updateTodo } from './graphql/mutations';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

const initialState = { name: '', description: '' };

function App() {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [apiError, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    setIsLoading(true);
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      setApiError(null);
    } catch (error) {
      console.error('Failed fetching todos:', error);
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) {
        return;
      }
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      setApiError(null);
    } catch (error) {
      console.error('Failed creating todo:', error);
      setApiError(error);
    }
  }

  async function removeTodo(id) {
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
      setTodos(todos.filter((todo) => todo.id !== id));
      setApiError(null);
    } catch (error) {
      console.error('Failed deleting todo:', error);
      setApiError(error);
    }
  }

  async function onItemUpdate(todo) {
    try {
      await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            name: todo.name,
            description: todo.description,
            id: todo.id,
          },
        })
      );
      setApiError(null);
    } catch (error) {
      console.error('Failed updating todo:', error);
      setApiError(error);
    }
  }

  const errorMessage = apiError && (
    <p style={styles.errorText}>
      {apiError.errors.map((error) => (
        <p>{error.message}</p>
      ))}
    </p>
  );

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Amplify React & GraphQL Todos</h1>
      {errorMessage}
      <div style={styles.grid}>
        <TodoList
          todos={todos}
          onRemoveTodo={removeTodo}
          onItemUpdate={onItemUpdate}
        />
        <CreateTodo
          description={formState.description}
          name={formState.name}
          onCreate={addTodo}
          onDescriptionChange={setInput}
          onNameChange={setInput}
        />
      </div>
    </div>
  );
}

const styles = {
  heading: {
    textAlign: 'center',
  },
  container: {
    margin: '0 auto',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    border: '2px solid red',
    padding: 10,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gridGap: '20px',
  },
};

export default App;
