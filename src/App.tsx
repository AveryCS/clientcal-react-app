
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './components/HomeView';
import SingleClientView from './components/SingleClientView';
import AddClientView from './components/AddClientView';
import CreateReportView from './components/CreateReportView';
import SuccessfulAddClientView from './components/SuccessfulAddClientView';
import ClientRatingReportView from './components/ClientRatingReportView';
import AllClientsReportView from './components/AllClientsReportView';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/single-client/:id" element={<SingleClientView />} />
        <Route path="/add-client" element={<AddClientView />} />
        <Route path="/create-report" element={<CreateReportView />} />
        <Route path="/successful-add-client" element={<SuccessfulAddClientView  />} />
        <Route path="/client-rating-report" element={<ClientRatingReportView />} />
        <Route path="/all-clients-report" element={<AllClientsReportView />} />
      </Routes>
    </Router>
  );
}

export default App;


