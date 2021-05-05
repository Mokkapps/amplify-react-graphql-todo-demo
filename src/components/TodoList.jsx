import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemoveTodo, onItemUpdate }) => {
  return (
    <div style={styles.container}>
      <h2>Your Todos</h2>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoListItem
            key={todo.id ? todo.id : index}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onItemUpdate={onItemUpdate}
          />
        ))
      ) : (
        <p>No todos available!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#023047',
    color: 'white',
    marginTop: 10,
    padding: 10,
  },
};

export default TodoList;
