/* eslint-disable react/prop-types */
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./index.scss";
import { TodoItem } from "../TodoItem";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function TodoList({todos, setTodos}) {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const updatedTodos = reorder(todos, source.index, destination.index);
    setTodos(updatedTodos);
  };

  const completeTodo = (text) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    )
    if (newTodos[todoIndex].completed == false) {
      newTodos[todoIndex].completed = true
      setTodos(newTodos)
    } else {
      newTodos[todoIndex].completed = false
      setTodos(newTodos)
    }
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    )
    newTodos.splice(todoIndex, 1)
    setTodos(newTodos)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todos-container">
        <Droppable droppableId="todos">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.text} draggableId={todo.text} index={index}>
                  {(draggableProvided) => (
                    <div
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                      className="task-item"
                    >
                      <TodoItem text={todo.text} completed={todo.completed} onComplete={() => completeTodo(todo.text)} onDelete={() => deleteTodo(todo.text)}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export { TodoList };
