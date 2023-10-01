import {BrowserRouter,  Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation / >
      </div>
      <div className='content'>
        <Routes>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
