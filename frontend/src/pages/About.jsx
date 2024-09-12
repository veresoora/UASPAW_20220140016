import React from "react";
import {
  VStack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Image,
  Container,
} from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h2" size="2xl" mb={4} color="black">
            About Soora
          </Heading>
          <Text fontSize="xl">
            We are a trusted e-commerce platform providing high-quality
            products.
          </Text>
        </Box>

        <SimpleGrid columns={[1, null, 2]} spacing={10}>
          <Box>
            <Heading as="h3" size="lg" mb={4} color="black">
              Our Vision
            </Heading>
            <Text>
              To become the leading e-commerce platform connecting sellers and
              buyers across Indonesia, providing an exceptional shopping
              experience and supporting SME growth.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="lg" mb={4} color="black">
              Our Mission
            </Heading>
            <Text>
              1. Provide a safe and trusted platform
              <br />
              2. Deliver excellent customer service
              <br />
              3. Support the growth of SMEs in Indonesia
              <br />
              4. Continuously innovate in e-commerce technology
            </Text>
          </Box>
        </SimpleGrid>

        <Box>
          <Heading as="h3" size="lg" mb={4} color="black">
            Our Team
          </Heading>
          <SimpleGrid columns={[2, null, 4]} spacing={6}>
            <TeamMember name="Nadia" position="CEO" />
            <TeamMember name="Muna" position="CTO" />
            <TeamMember name="Haliza" position="COO" />
            <TeamMember name="Kusuma" position="CMO" />
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

const TeamMember = ({ name, position }) => {
  return (
    <VStack>
      <Image
        borderRadius="full"
        boxSize="150px"
        src={`https://via.placeholder.com/150?text=${name.charAt(0)}`}
        alt={name}
        mb={2}
      />
      <Text fontWeight="bold">{name}</Text>
      <Text color="gray.500">{position}</Text>
    </VStack>
  );
};

export default About;
