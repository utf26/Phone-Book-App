import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddContact from './components/Contacts/AddContacts';
import Contacts from './components/Contacts/Contacts.js'
import EditContact from './components/Contacts/EditContact';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Contacts />} />
          <Route exact path="/addContact" element={<AddContact />} />
          <Route exact path="/editContact/:id" element={<EditContact />} />
        </Routes>
      </Router>
  );
}

export default App;
