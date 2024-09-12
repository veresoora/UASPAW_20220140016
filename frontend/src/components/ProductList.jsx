import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";
import {
  VStack,
  Heading,
  Button,
  SimpleGrid,
  Box,
  Text,
  Image,
  Flex,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    sortProducts();
  }, [sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`, {
        params: { search: searchTerm },
      });
      console.log("Fetched products:", response.data); // Add this line
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err); // Add this line
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Product added",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <VStack spacing={6} align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="xl">
          Product List
        </Heading>
        <Button onClick={toggleSortOrder} variant="outline" borderColor="black">
          Sort: Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth={1}
            borderRadius="none"
            overflow="hidden"
            shadow="sm"
            transition="all 0.3s"
            _hover={{ shadow: "md" }}
            display="flex"
            flexDirection="column"
            height="100%"
          >
            <Image
              src={`/images/${product.image}`}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <Box p={4} flex="1" display="flex" flexDirection="column">
              <Heading as="h3" size="sm" mb={2}>
                {product.name}
              </Heading>
              <Spacer />
              <Text fontWeight="bold" mb={4}>
                Rp{product.price.toLocaleString()}
              </Text>
              <VStack spacing={2} mt="auto">
                <Button
                  as={RouterLink}
                  to={`/products/${product.id}`}
                  colorScheme="gray"
                  variant="outline"
                  width="full"
                  size="sm"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => handleAddToCart(product)}
                  colorScheme="blue"
                  variant="solid"
                  width="full"
                  size="sm"
                  bg="black"
                  color="white"
                >
                  Add to Cart
                </Button>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ProductList;
