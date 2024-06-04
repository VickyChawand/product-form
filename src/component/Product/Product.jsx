import React, { useState, useEffect } from "react";
import "./product.css";
import jsonData from "../Product.json";
import { MdDelete } from "react-icons/md";

const conversionRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  INR: 75,
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const Product = () => {
  const [collections, setCollections] = useState(jsonData.collections);
  const [products, setProducts] = useState([{ collection: '', product: '', price: 0, qty: 0, total: 0 }]);
  const [currency, setCurrency] = useState("USD");
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleProductChange = (index, field, value) => {
    const newProducts = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = { ...product, [field]: value };
        if (field === 'collection') {
          updatedProduct.product = '';
          updatedProduct.price = 0;
          updatedProduct.qty = 0;
          updatedProduct.total = 0;
        }
        if (field === 'product') {
          const selectedProduct = collections[updatedProduct.collection].find(p => p.product_name === value);
          updatedProduct.price = selectedProduct ? selectedProduct.price * conversionRates[currency] : 0;
          updatedProduct.qty = 1;
        }
        updatedProduct.total = updatedProduct.price * updatedProduct.qty;
        return updatedProduct;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { collection: '', product: '', price: 0, qty: 0, total: 0 }]);
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + product.total, 0).toFixed(2);
  };

  useEffect(() => {
    const updatedProducts = products.map(product => {
      const selectedProduct = collections[product.collection]?.find(p => p.product_name === product.product);
      const newPrice = selectedProduct ? selectedProduct.price * conversionRates[currency] : 0;
      const newTotal = newPrice * product.qty;
      return { ...product, price: newPrice, total: newTotal };
    });
    setProducts(updatedProducts);
  }, [currency]);

  return (
    <div className="outter-container">
      <h3>Product Details</h3>
      
      {/* Currency Selector */}
      <div>
        <label>Select Currency: </label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {Object.keys(conversionRates).map((curr) => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Collection</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr 
              key={index} 
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Collections */}
              <td>
                <select name="collection" value={product.collection} onChange={(e) => handleProductChange(index, 'collection', e.target.value)}>
                  <option value="">Select Collection</option>
                  {Object.keys(collections).map((collectionName, idx) => (
                    <option key={idx} value={collectionName}>{collectionName}</option>
                  ))}
                </select>
              </td>

              {/* Product */}
              <td>
                <select name="product" value={product.product} onChange={(e) => handleProductChange(index, 'product', e.target.value)}>
                  <option value="">Select Product</option>
                  {product.collection && collections[product.collection].map((prod, idx) => (
                    <option key={idx} value={prod.product_name}>{prod.product_name}</option>
                  ))}
                </select>
              </td>

              {/* Price */}
              <td>
                {currencySymbols[currency]} {product.price.toFixed(2)}
              </td>

              {/* Quantity */}
              <td>
                <input type="number" name="qty" min='1' max='10' value={product.qty} onChange={(e) => handleProductChange(index, 'qty', parseInt(e.target.value, 10))} />
              </td>

              {/* Total Price */}
              <td>{currencySymbols[currency]} {product.total.toFixed(2)}</td>

              {/* Delete Button */}
              {hoveredRow === index && (
                <td className="delete-btn">
                  <button onClick={() => handleDeleteProduct(index)}><MdDelete /></button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add button */}
      <button onClick={handleAddProduct} id="btn">+ Add Product</button>

      {/* Sub Total */}
      <div className="total">
        <span>Sub Total</span>
        <span>{currencySymbols[currency]} {calculateSubtotal()}</span>
      </div>

      {/* TextArea */}
      <div className="textarea">
        <span>Comments or Questions</span>
        <textarea />
      </div>
    </div>
  );
};

export default Product;
