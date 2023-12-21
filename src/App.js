import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [items, setItems] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [searchTerm, setSearchTerm] = useState('');

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
