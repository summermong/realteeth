import { AppProviders } from './providers';
import { Main } from '../pages/Main';

function App() {
  return (
    <AppProviders>
      <div className='min-h-screen p-6 bg-gray-100'>
        <Main />
      </div>
    </AppProviders>
  );
}

export default App;
