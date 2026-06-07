import { useEffect, useState } from 'react';
import axios from "axios";
export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get(`http://localhost:3000/articles`)
    .then(res => {
      setArticles(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    axios.get(`http://localhost:3000/categories`)
    .then(res => {
      setCategories(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }
  const checkFilter = async () =>{
    try {
      if(selectedCategoryId){
        const res = await axios.get(`http://localhost:3000/categories/${selectedCategoryId}/articles`)
        console.log(res.data);
        setArticles(res.data);
      } else {
        fetchArticles();
      }
    } catch(err){
      console.err(err);
    } 
  } 
  const resetFilter = () =>{
    setSelectedCategoryId('')
    fetchArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select 
          id="categoryFilter"
          value={selectedCategoryId}
          onChange={e => setSelectedCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}> {c.name} category </option>
          ))}
          {/* Options for categories */}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            checkFilter()
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            resetFilter()
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}