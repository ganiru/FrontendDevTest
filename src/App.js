import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [searchTerm, setSearchTerm] = useState('teter');

 useEffect(() => {
   fetch('https://jsonplaceholder.typicode.com/todos')
     .then(response => {
       if (response.ok) {
         return response.json();
       } else {
         throw new Error('Error: ' + response.statusText);
       }
     })
     .then(data => {
       setItems(data);
       setLoading(false);
     })
     .catch(error => {
       setError(error.message);
       setLoading(false);
     });
 }, []);
console.log({items});
 const filteredItems = items.filter(item =>
   item.title.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div>
     <input
       type="text"
       placeholder="Search items"
       value={searchTerm}
       onChange={e => setSearchTerm(e.target.value)}
     />
     {loading && <p>Loading...</p>}
     {error && <p>Error: {error}</p>}
     {!loading && !error && (
       
       <ul>
         {filteredItems.map(item => (
           <li key={item.id}>{item.title}</li>
         ))}
       </ul>
     )}
   </div>
 );
};


export default App;
