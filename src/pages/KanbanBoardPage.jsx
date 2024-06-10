import React, { useState } from 'react';
import { Box, Container, Heading, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

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

const KanbanBoardPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <HStack justifyContent="space-between" mb={6}>
        <Heading as="h1" size="xl">Kanban Board</Heading>
        <Button colorScheme="teal" as={Link} to="/">Home</Button>
      </HStack>
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack spacing={4} alignItems="flex-start">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <VStack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  bg="gray.100"
                  p={4}
                  borderRadius="md"
                  minW="250px"
                  spacing={4}
                >
                  <Heading as="h2" size="md" textTransform="capitalize">{columnId.replace(/([A-Z])/g, ' $1')}</Heading>
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          bg="white"
                          p={4}
                          borderRadius="md"
                          boxShadow="md"
                          w="100%"
                        >
                          <Text>{task.content}</Text>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          ))}
        </HStack>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoardPage;