import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="weather-app">
      <header className="weather-app-header">
        <span>Weather App</span>
        <div id='github-info-container'>
          <span>Creator Github: </span>
          <a
            className="github-link"
            href="https://github.com/Jake152"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Jake152
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
