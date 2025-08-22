import { categories, products } from '../data/mockData';

export default class DataService {
  static getAllCategories() {
    return categories;
  }

  static getFilteredProducts({ categoryId = 'all', searchQuery = '', availableOnly = false }) {
    const q = String(searchQuery).toLowerCase();
    return products.filter((p) => {
      const matchesCategory = categoryId === 'all' || p.categoryId === categoryId;
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }

  static getProductById(id) {
    return products.find((p) => p.id === id) || null;
  }
}


