import { useEffect, useState } from 'react';
import axios from "axios";
export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    axios.get(`http://localhost:3000/journalists`)
    .then(res => {
      setJournalists(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  };
  const checkFilter = async () =>{
    try {
      if(selectedJournalistId){
        const res = await axios.get(`http://localhost:3000/journalists/${selectedJournalistId}/articles`)
        console.log(res.data);
        setArticles(res.data);
      } else {
        fetchArticles();
      }
    } catch(err){
      console.error(err);
    } 
  } 
  const resetFilter = () =>{
    setSelectedJournalistId('')
    fetchArticles();
  }
  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select 
        id="journalistFilter"
        value={selectedJournalistId}
        onChange={e => (
          setSelectedJournalistId(e.target.value)
        )}
        >
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}> {j.name}</option>
          ))}
          {/* Options for journalists */}
        </select>

        <button
          onClick={checkFilter}
        >Apply Filters</button>
        <button
          onClick={resetFilter}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Journalist #{article.JournalistId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}