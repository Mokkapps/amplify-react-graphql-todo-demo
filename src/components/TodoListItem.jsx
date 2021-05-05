import React, { useState } from 'react';
import Button from './Button';

const TodoListItem = ({ todo, onRemoveTodo, onItemUpdate }) => {
  const { name: todoName, description: todoDescription, id } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todoName);
  const [description, setDescription] = useState(todoDescription);

  const onEditButtonClick = () => {
    if (isEditing) {
      const updatedTodo = { ...todo, name, description };
      onItemUpdate(updatedTodo);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        {isEditing ? (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <span style={styles.todoName}>{name}</span>
        )}
        {isEditing ? (
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        ) : (
          <span style={styles.todoDescription}>{description}</span>
        )}
      </div>
      <div style={styles.buttonContainer}>
        <Button onClick={onEditButtonClick}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        {!isEditing && <Button onClick={() => onRemoveTodo(id)}>Delete</Button>}
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    marginRight: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  container: {
    width: '100%',
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffb703',
    borderRadius: 2,
  },
  todoName: { fontWeight: 'bold', marginBottom: 10, color: 'black' },
  todoDescription: { marginBottom: 0, color: 'black' },
};

export default TodoListItem;
