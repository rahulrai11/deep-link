import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useNavigate, useLocation, BrowserRouter, HashRouter } from 'react-router-dom';
import DeepNotFound from './deeplink/DeepNotFound';
import HTMLPage from './deeplink/HTMLPage';
import Onbording from './Onbording';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Onbording />} />
          <Route path="/app" element={<HTMLPage />} />
          <Route path="/app/*" element={<DeepNotFound />} />
        </Routes>
      </HashRouter>;

    </>

  )
}

export default App;
