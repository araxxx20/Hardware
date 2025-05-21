import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaSearch } from 'react-icons/fa';

function SalesReport() {
  const salesData = [
    { id: '00000001', date: '11/12/22', name: 'Pliers', category: 'Tools', items: '3 Items', price: '₱430' },
    { id: '00000002', date: '2/12/22', name: 'Hammer', category: 'Tools', items: '5 Items', price: '₱257' },
    { id: '00000003', date: '5/12/22', name: '40 watts Bulb', category: 'Electrical Supplies', items: '10 Items', price: '₱405' },
    { id: '00000004', date: '8/12/22', name: 'Circuit Breaker', category: 'Electrical Supplies', items: '1 Items', price: '₱502' },
    { id: '00000005', date: '9/1/23', name: 'Measuring Tape', category: 'Electrical Supplies', items: '5 Items', price: '₱530' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const parseDate = (str) => {
    const [day, month, year] = str.split('/').map(Number);
    return new Date(2000 + year, month - 1, day);
  };

  const parseInputDate = (str) => (str ? new Date(str) : null);

  const filteredSales = salesData.filter(item => {
    const itemDate = parseDate(item.date);
    const searchMatch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());

    if (!startDate) return searchMatch;

    const filterDate = parseInputDate(startDate);
    return searchMatch && itemDate >= filterDate;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedSales = useMemo(() => {
    const sorted = [...filteredSales];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          aVal = parseDate(aVal);
          bVal = parseDate(bVal);
        } else if (sortConfig.key === 'price') {
          aVal = parseFloat(aVal.replace(/[^\d.]/g, ''));
          bVal = parseFloat(bVal.replace(/[^\d.]/g, ''));
        } else if (sortConfig.key === 'items') {
          aVal = parseInt(aVal);
          bVal = parseInt(bVal);
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredSales, sortConfig]);

  const totalPages = Math.ceil(sortedSales.length / itemsPerPage);
  const paginatedSales = sortedSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleGenerateReport = () => {
  const headers = ['ID', 'Date', 'Name', 'Category', 'Items', 'Price'];
  const rows = filteredSales.map((item) => [
    item.id,
    item.date,
    item.name,
    item.category,
    item.items,
    item.price,
  ]);

  let csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers, ...rows].map((e) => e.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'sales_report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, startDate]);

  return (
    <Navbar>
       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales Reports</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
         <button
  type="button"
  className="btn btn-sm btn-success"
  onClick={handleGenerateReport}>
  Generate Report
</button>

        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="border rounded px-4 py-2 w-full focus:outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                {['id', 'date', 'name', 'category', 'items', 'price'].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                    <i className={`fas fa-sort${sortConfig.key === key ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSales.length > 0 ? (
                paginatedSales.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.items}</td>
                    <td className="px-4 py-2">{item.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="mt-4" aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Navbar>
  );
}

export default SalesReport;
