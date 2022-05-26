import './App.css';
import Codes from './components/codes';
import Upload from './components/upload'

function App() {
  document.body.style = 'background: rgb(57, 59, 89)';

  return (
    <div className="App">
      <Codes/>
      <Upload/>
    </div>
  );
}

export default App;
