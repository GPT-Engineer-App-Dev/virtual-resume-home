import React, { useState } from 'react';
import { Box, Container, Heading, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

const ItemTypes = {
  TASK: 'task',
};

const initialTasks = {
  todo: [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
  ],
  inProgress: [
    { id: '3', content: 'Task 3' },
  ],
  done: [
    { id: '4', content: 'Task 4' },
  ],
};

const Task = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Box
      ref={(node) => ref(drop(node))}
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      w="100%"
    >
      <Text>{task.content}</Text>
    </Box>
  );
};

const Column = ({ columnId, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      moveTask(item.index, tasks.length, columnId);
    },
  });

  return (
    <VStack
      ref={drop}
      bg="gray.100"
      p={4}
      borderRadius="md"
      minW="250px"
      spacing={4}
    >
      <Heading as="h2" size="md" textTransform="capitalize">{columnId.replace(/([A-Z])/g, ' $1')}</Heading>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </VStack>
  );
};

const KanbanBoardPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (fromIndex, toIndex, toColumnId = null) => {
    const fromColumnId = Object.keys(tasks).find(columnId =>
      tasks[columnId].some((task, index) => index === fromIndex)
    );

    const fromColumn = tasks[fromColumnId];
    const [movedTask] = fromColumn.splice(fromIndex, 1);

    if (toColumnId && fromColumnId !== toColumnId) {
      tasks[toColumnId].splice(toIndex, 0, movedTask);
    } else {
      fromColumn.splice(toIndex, 0, movedTask);
    }

    setTasks({
      ...tasks,
      [fromColumnId]: fromColumn,
      ...(toColumnId && { [toColumnId]: tasks[toColumnId] }),
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxW="container.xl" py={10}>
        <HStack justifyContent="space-between" mb={6}>
          <Heading as="h1" size="xl">Kanban Board</Heading>
          <Button colorScheme="teal" as={Link} to="/">Home</Button>
        </HStack>
        <HStack spacing={4} alignItems="flex-start">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Column key={columnId} columnId={columnId} tasks={columnTasks} moveTask={moveTask} />
          ))}
        </HStack>
      </Container>
    </DndProvider>
  );
};

export default KanbanBoardPage;