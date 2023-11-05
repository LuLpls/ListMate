import {BrowserRouter,  Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import ShoppingListList from './pages/ShoppingListList'
import ShoppingListTrash from './pages/ShoppingListTrash'
import ShoppingListDetail from './pages/ShoppingListDetail'
import NotFound from './pages/NotFound'
import About from './pages/About'
import { ShoppingListsProvider } from './components/context/ShoppingListContext'
import { ShoppingListDetailProvider } from './components/context/ItemContext'


function App() {
  return (
    <div>
    <BrowserRouter>
      <div className='App'>
        <Navigation />
      </div>
      <div className='content'>
        <ShoppingListsProvider>
          <ShoppingListDetailProvider>
            <Routes>
              <Route path='/' element={<ShoppingListList />} />
              <Route path='/trash' element={<ShoppingListTrash />} />
              <Route path='/shoppinglist/:id' element={<ShoppingListDetail />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ShoppingListDetailProvider>
        </ShoppingListsProvider>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
