import {BrowserRouter,  Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import ShoppingListList from './pages/ShoppingListList';
import ShoppingListTrash from './pages/ShoppingListTrash';
import ShoppingListDetail from './pages/ShoppingListDetail';
import { ShoppingListProvider } from './components/context/ShoppingListContext'

function App() {
  return (
    <div className='main-container'>
    <BrowserRouter>
      <div className='App'>
        <Navigation />
      </div>
      <div className='content'>
        <ShoppingListProvider>
        <Routes>
          <Route path='/' element={<ShoppingListList />} />
          <Route path='/trash' element={<ShoppingListTrash />} />
          <Route path='/shoppinglist/:id' element={<ShoppingListDetail />} />
        </Routes>
        </ShoppingListProvider>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
