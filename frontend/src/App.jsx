import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Link,
  Container,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar"; // Kita akan membuat komponen ini

function App() {
  return (
    <Router>
      <Flex minHeight="100vh" direction="column">
        <Box
          as="header"
          bg="white"
          color="black"
          py={4}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Container maxW="container.xl">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h1" size="lg">
                Soora
              </Heading>
              <HStack spacing={8}>
                <Link as={RouterLink} to="/">
                  Home
                </Link>
                <Link as={RouterLink} to="/products">
                  Products
                </Link>
                <Link as={RouterLink} to="/about">
                  About Us
                </Link>
              </HStack>
              <SearchBar />
            </Flex>
          </Container>
        </Box>

        <Container maxW="container.xl" flex="1" py={8}>
          <Flex>
            <Box flex="1" mr={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Box>
            <Box
              width="300px"
              position="sticky"
              top="20px"
              alignSelf="flex-start"
            >
              <Cart />
            </Box>
          </Flex>
        </Container>

        <Box as="footer" bg="black" color="white" p={4} mt="auto">
          <Container maxW="container.xl" textAlign="center">
            <p>&copy; 2024 Soora. Copyright Protected.</p>
          </Container>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
