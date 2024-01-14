import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [listItems, setListItems] = useState([]);
  const [error, setError] = useState(null);

  const inputChanged = (event) => {
    setKeyword(event.target.value);
  };

  const fetchRepos = () => {
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData.items);
        setError(null);
      })
      .catch((error) => {
        setListItems([]);
        setError('Error fetching repositories. Please try again.');
      });
  };

  return (
    <>
      <h2>Repositories</h2>
      <input type="text" onChange={inputChanged} value={keyword} />
      <button onClick={fetchRepos}>Search</button>
      {error && <p>{error}</p>}
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
          {listItems.length > 0 ? (
            listItems.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.html_url}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No repositories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
