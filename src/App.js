import { useState } from "react";
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      axios.get(`/weather?address=${search}`)
        .then((response) => {
          setData(response.data);
          setError(null); 
        })
        .catch((err) => {
          setError("Error fetching data"); 
          console.log("error", err);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Your Address:</label>
      <input placeholder="Enter location..." value={search} onChange={handleChange} />
      <button>Submit</button>
      <button onClick={()=>{setData({})
    setSearch("")}}>Clear</button>
      {data.weather && (
        <div>
          <h2>{data.Location}</h2>
          <p>Its Currently : {data.weather}</p>
          <p>Temperature : {data.Temperature}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default App;
