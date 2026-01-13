import { AppProviders } from './providers';
import { Main } from '../pages/Main';

function App() {
  return (
    <AppProviders>
      <div className='min-h-screen bg-gray-100'>
        <Main />
      </div>
    </AppProviders>
  );
}

export default App;
