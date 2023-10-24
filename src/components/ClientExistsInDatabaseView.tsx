// import NavBar from "./NavBar";

// const ClientExistsInDatabaseView = () => {
//     return (

//         <div className="container">
//           <NavBar/>
//       <h2>Client already exists in database</h2>
//       <p></p>
//     </div>

        
//     );
//   };
  
//   export default ClientExistsInDatabaseView;

import NavBar from "./NavBar";

const ClientExistsInDatabaseView = () => {
  return (
    <div className="container">
      <NavBar />
      <div className="container mt-0">
        <h2 className="mt-4">Client already exists in the database</h2>
        <p></p>
      </div>
    </div>
  );
};

export default ClientExistsInDatabaseView;
