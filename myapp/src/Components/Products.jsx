import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      setData(products);
      setFilteredProduct(products);
    }
    fetchData();
  }, []);

  //FILTER

  const getFilteredProducts = (query, products) => {
    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const lowerQuery = query.toLowerCase();

      return (
        product.title.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.price.toString().includes(lowerQuery)
      );
    });
  };

  useEffect(() => {
    const filteredData = getFilteredProducts(searchQuery, data);
    setFilteredProduct(filteredData);
  }, [searchQuery, data]);

  //SEARCH
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //DELETE
  const handleDelete = (productId) => {
    const updatedData = data.filter((product) => product.id !== productId);
    setData(updatedData);
  };

  //EDIT
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  //MODAL
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = (updatedProduct) => {
    const updatedData = data.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setData(updatedData);
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="product-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="products">
          {filteredProduct.map((el) => (
            <div key={el.id} className="product">
              <img src={el.image} alt={el.title} />
              <p>{el.title}</p>
              <p>{el.category}</p>
              <p>{el.price}</p>

              <div className="product-buttons">
                <button
                  onClick={() => handleDelete(el.id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button onClick={() => handleEdit(el)} className="edit-button">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form>
              <label>Title:</label>
              <input
                type="text"
                className="title"
                value={selectedProduct.title}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    title: e.target.value,
                  })
                }
              />
              <label>Price:</label>
              <input
                type="text"
                className="price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <button onClick={() => handleSaveEdit(selectedProduct)}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
