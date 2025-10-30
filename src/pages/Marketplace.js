import React, { useState, useEffect } from "react";

function Marketplace() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const backendUrl = process.env.BACKEND_URL;
  const marketplaceUrl = `${backendUrl}/marketplace`;
  // Fetch all marketplace items
  const fetchItems = async () => {
    try {
      const res = await fetch(marketplaceUrl);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load marketplace items.");
    }
  };

  // Add a new item
  const addItem = async () => {
    try {
      const res = await fetch(marketplaceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Demo Product",
          description: "Added from Marketplace button",
          price: Math.floor(Math.random() * 200) + 50,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
      fetchItems(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("Failed to add item.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>🛒 IMPEARL Marketplace</h1>
      <button
        onClick={addItem}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ➕ Add Item
      </button>

      <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>

      <div
        style={{
          marginTop: "2rem",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2>Marketplace Items</h2>
        {items.length === 0 ? (
          <p>No items yet. Click the button to add one!</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                  Description
                </th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Price ($)</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.description}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{item.price}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
