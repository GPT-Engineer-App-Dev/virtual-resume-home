import React, { useEffect } from 'react';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

const ConfettiPage = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Heading as="h1" size="2xl" mb={6}>Celebrate with Confetti!</Heading>
      <Box mb={6}>
        <Button colorScheme="teal" size="lg" as={Link} to="/">Go Back Home</Button>
      </Box>
    </Container>
  );
};

export default ConfettiPage;