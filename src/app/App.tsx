import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './providers';
import { Main } from '../pages/Main';
import { Detail } from '../pages/Detail';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <div className='min-h-screen p-6 bg-gray-100'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/detail/:favoriteId' element={<Detail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
