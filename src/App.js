import logo from './logo.svg';
import './App.css';
import Tried from './pages/Tried'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Tried/>}>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
