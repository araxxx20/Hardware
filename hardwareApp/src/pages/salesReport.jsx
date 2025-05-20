import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaSearch } from 'react-icons/fa';

function SalesReport() {
  const salesData = [
    { id: '00000001',date: '11/12/22', name: 'Pliers',category: 'Tools', items: '3 Items', price: '₱430' },
    { id: '00000002',date: '2/12/22' , name: 'Hammer', category: 'Tools',items: '5 Items', price: '₱257'},
    { id: '00000003',date: '5/12/22', name: '40 watts Bulb', category: 'Electrical Supplies', items: '10 Items', price: '₱405' },
    { id: '00000004',date: '8/12/22', name: 'Circuit Breaker', category: 'Electrical Supplies', items: '1 Items', price: '₱502' },
    { id: '00000005',date: '9/1/23', name: 'Measuring Tape',category: 'Electrical Supplies', items: '5 Items', price: '₱530' },

  ];


  return (
    <Navbar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales Reports</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-success">
            Generate Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Search Input */}
    <div className="flex items-center border rounded px-3">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        className="w-full border-0 focus:outline-none py-2"
        placeholder="Search transactions..."
      />
    </div>

    {/* Date Range Input */}
    <input
      type="text"
      className="border rounded px-4 py-2 w-full focus:outline-none"
      placeholder="01 March 2025 - 31 March 2025"
    />

    {/* Buttons */}
    <div className="flex justify-end gap-2">
      <button className="btn btn-outline-secondary">Filter by Date</button>
      
    </div>
  </div>
</div>

   





      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Transaction ID <i className=""></i>
          </th>
           <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Date <i className=""></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Product Name <i className=""></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Category <i className=""></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Items <i className=""></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Total Price <i className=""></i>
          </th>
         
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {salesData.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{item.id}</td>
             <td className="px-4 py-2">{item.date}</td>
           <td className="px-4 py-2">{item.name}</td>
            <td className="px-4 py-2">{item.category}</td>
            <td className="px-4 py-2">{item.items}</td>
            <td className="px-4 py-2">{item.price}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
  

          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

 
    </Navbar>
  );
}

export default SalesReport;