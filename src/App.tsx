import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './components/HomeView';
import SingleClientView from './components/SingleClientView';
import AddClientView from './components/AddClientView';
import CreateReportView from './components/CreateReportView';
import SuccessfulAddClientView from './components/SuccessfulAddClientView';
import ClientRatingReportView from './components/ClientRatingReportView';
import AllClientsReportView from './components/AllClientsReportView';

function App() {

// const clientDetails ={
//     name: string;
//     hoursBookedPerYear: number;
//     hourlyRate: number;
//     email: string;
//     easeToWorkWith: number;
//     clientRating: number;
//     // Add more fields as needed
  
// }

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


//________________

// function App() {
//   let items = ["New York", "San Francisco", "Tokyo", "London", "Daphne"];

//   // return (
//   //   <Router>
//   //     <div>
//   //       <Route path="/" Component={HomeView} />
//   //       {/* Add other routes here if needed */}
//   //       {/* Uncomment the line below if you want to render a ListGroup component */}
//   //       <ListGroup items={items} heading="Cities" />
//   //     </div>
//   //   </Router>
//   // );

//   return (
//     <div>
//       {/* <ListGroup items={items} heading ="Cities" /> */}
//       <HomeView/>
//       {/* Home; */}
//     </div>
//   );
// }
// //You export a function if you want that function to be used in another file
// export default App;

//_______________
