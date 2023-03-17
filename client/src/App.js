import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './login&Signup/SignUp';
import Login from './login&Signup/login';
import Admin from './Admin/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/signUp' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
