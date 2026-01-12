import { AppProviders } from './providers';

function App() {
  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-8">
          Weather App
        </h1>
        <p className="text-center text-gray-600">
          리얼티쓰 채용 과제
        </p>
      </div>
    </AppProviders>
  );
}

export default App;
