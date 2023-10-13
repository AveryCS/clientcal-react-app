import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './components/HomeView';
import SingleClientView from './components/SingleClientView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/single-client" element={<SingleClientView />} />
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
