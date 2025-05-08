import React from "react";

function Sales() {
  const handleGenerateReport = () => {
    const salesData = [
      ["Sales Report"],
      ["Date", "Product Name", "Category", "Price", "Quantity Sold", "Total"],
      ["06/03/2025", "40 watts Bulb", "Electrical Supply", 50, 50, 2500],
      [],
      ["Financial Analysis"],
      ["Product Name", "Cost", "Price", "Quantity Sold", "Total", "Profit"],
      ["40 watts Bulb", 30, 50, 50, 2500, 1000],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      salesData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sales-container">
      <h2>Sales</h2>
      <div className="search-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search here" />
        </div>
        <button className="generate-btn" onClick={handleGenerateReport}>Generate Report</button>
      </div>

      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity Sold</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>06/03/2025</td>
              <td>40 watts Bulb</td>
              <td>Electrical Supply</td>
              <td>50</td>
              <td>50</td>
              <td>2,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Financial Analysis</h2>
      <div className="financial-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Quantity Sold</th>
              <th>Total</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>40 watts Bulb</td>
              <td>30</td>
              <td>50</td>
              <td>50</td>
              <td>2,500</td>
              <td>1,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
