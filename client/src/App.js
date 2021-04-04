import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainRoute from './MainRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
