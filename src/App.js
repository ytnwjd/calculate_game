import './App.css';
import MathGame from './components/MathGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> 맞 춰 봐 </h1>
        <p>30초 안에 정답을 맞추지 못하면... </p>
      </header>

      <main>
        <MathGame />
      </main>
    </div>
  );
}

export default App;
