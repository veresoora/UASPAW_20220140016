const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Chanel Lambskin Quilted Mini",
    price: 28000000,
    description:
      "This is an authentic CHANEL Lambskin Quilted Mini Top Handle Rectangular Flap in Black. This chic mini cross body classic is crafted of quiltedlambskin leather in black. The bag features a leather top handle, a gold chain link leather threaded shoulder strap and a facing gold Classic CC turn lock. This opens the flap to a black leather interior with pockets.",
    image: "Lambskin.jpg",
  },
  {
    id: 2,
    name: "Saint Laurent Opyum 110 Logo",
    price: 17980000,
    description:
      "SAINT LAURENT's original 1961 moniker is too iconic to be left in the past. These 'Opyum' sandals have been made in Italy from black patent-leather and have sleek straps to ensure all focus remains on the logo-lettered heel. The square toes nod to the '90s in such a subtle way.",
    image: "Opyum.jpg",
  },
  {
    id: 3,
    name: "Louis Vuitton Calfskin Monogram 30mm",
    price: 8750000,
    description:
      "This is an authentic LOUIS VUITTON Calfskin Monogram 30mm LV Initiales Reversible Belt size 90 or 36 in Black. The bold style and stunning detailing of this Louis Vuitton belt make it a fabulous fashion accessory. The belt features classic Louis Vuitton monogram coated canvas on one side, and textured black calfskin leather on the other, with a polished gold Louis Vuitton LV logo buckle.",
    image: "Belt.jpg",
  },
  {
    id: 4,
    name: "Dior Saddle Bag with Strap Black Grained Calfskin",
    price: 24999000,
    description:
      "Maria Grazia Chiuri brings a fresh update to the iconic Saddle bag. Crafted in black grained calfskin, the legendary design features a Saddle flap with a D stirrup strap and magnetic pull, as well as an antique gold-finish metal CD signature on either side of the handle. Equipped with a thin, adjustable and removable strap, the Saddle bag may be carried by hand, worn over the shoulder or crossbody.",
    image: "Saddle.jpg",
  },
];

// GET all products
app.get("/api/products", (req, res) => {
  const { search } = req.query;
  if (search) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

// POST a new product
app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET a specific product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// PUT (update) a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, price, description } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;

  res.json(product);
});

// DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
