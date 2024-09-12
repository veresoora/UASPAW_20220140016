import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup maxW="300px">
        <Input
          placeholder="Cari produk"
          bg="white"
          color="black"
          borderColor="gray.300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            type="submit"
            aria-label="Search"
            icon={<SearchIcon />}
            bg="transparent"
            color="gray.500"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
