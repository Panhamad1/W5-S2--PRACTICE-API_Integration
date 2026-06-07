import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function UpdateArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {

  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      content: form.content
    }
    if(form.title !== ""){
      updateData.title = form.title;
    }
    if (form.journalistId !== "") {
      updateData.journalistId = form.journalistId;
    }
    if (form.categoryId !== "") {
      updateData.categoryId = form.categoryId;
    }
    // Update article with axios
    axios.put(`http://localhost:3000/articles/${id}`,updateData)
    .then(res => {
      console.log(res.data);
      alert(res.data)
      setForm({
        title: '',
        content: '',
        journalistId: '',
        categoryId: '',
      })
      navigate(`/`)
    })
    .catch(err =>{
      console.error(err)
      alert(err);
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title"/><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID"/><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID"/><br />
      <button type="submit">Update</button>
    </form>
  );
}
