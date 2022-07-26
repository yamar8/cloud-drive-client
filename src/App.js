import './App.css';
import Layout from './components/Layout';

export const baseUrl = process.env.BASE_URL;

function App() {
  console.log(baseUrl);
  return (
    <div className="App">
    <Layout/>
    </div>
  );
}

export default App;
