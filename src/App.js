import NewsFeed from "./components/NewsFeed/NewsFeed";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Global News Explorer</h1>
      </header>
      <main>
        <NewsFeed apiKey={process.env.REACT_APP_NEWS_API_KEY}/>
      </main>
    </div>
  );
}

export default App;
