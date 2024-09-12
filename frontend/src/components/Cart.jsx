import React from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box borderWidth={1} borderRadius="none" p={4} bg="white" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="md">
          Shopping Cart
        </Heading>
        <Divider />
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            {cart.map((item) => (
              <Flex key={item.id} justify="space-between" align="center">
                <Box>
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Text color="gray.600">
                    Rp{item.price.toLocaleString()} x {item.quantity}
                  </Text>
                </Box>
                <IconButton
                  icon={<CloseIcon />}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Hapus item"
                  size="sm"
                  variant="ghost"
                />
              </Flex>
            ))}
            <Divider />
            <Flex justify="space-between" fontWeight="bold">
              <Text>Total:</Text>
              <Text>Rp{total.toLocaleString()}</Text>
            </Flex>
            <Button
              colorScheme="blue"
              variant="solid"
              width="full"
              size="sm"
              bg="black"
              color="white"
            >
              Proceed to Payment
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Cart;
