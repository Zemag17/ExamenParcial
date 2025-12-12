import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GoogleLoginButton from './components/GoogleLoginButton';

// Placeholder pages
const Home = () => <div><h1>Home Page</h1><p>Bienvenido al examen parcial.</p></div>;
const Login = () => (
  <div>
    <h1>Login</h1>
    <GoogleLoginButton 
      onSuccess={(cred) => console.log(cred)} 
      onError={() => console.log('Error')} 
    />
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <a href="/">Home</a> | <a href="/login">Login</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
