import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Event from './pages/Event';
import EventForm from './pages/EventForm';
import Header from './components/Header';

// some paths have the same element (home)
// they are rendered based on their path
function App() {
  return (
    <>
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/' element={<Home /> } />
                    <Route path='/my-events' element={<Home /> } />
                    <Route path='/event/:id' element={<Event /> } />
                    <Route path='/create-event' element={<EventForm />} />
                    <Route path='/update-event/:id' element={<EventForm />} />
                </Routes>
            </div>
        </Router>
        <ToastContainer />
    </>
  );
}

export default App;
