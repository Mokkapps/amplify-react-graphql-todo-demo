import React from 'react';
import Button from './Button';

const CreateTodo = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onCreate,
}) => (
  <div style={styles.container}>
    <input
      onChange={(event) => onNameChange('name', event.target.value)}
      style={styles.input}
      value={name}
      placeholder="Name"
    />
    <input
      onChange={(event) =>
        onDescriptionChange('description', event.target.value)
      }
      style={styles.input}
      value={description}
      placeholder="Description"
    />
    <Button onClick={onCreate}>Create Todo</Button>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#023047',
    marginTop: 10,
    padding: 10,
    height: 150,
  },
  input: {
    border: 'none',
    backgroundColor: '#e5e5e5',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
};

export default CreateTodo;
