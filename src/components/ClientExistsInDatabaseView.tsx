import NavBar from "./NavBar";

const ClientExistsInDatabaseView = () => {
  return (
    <div className="container-fluid">
    <div className="d-flex justify-content-center">
       <NavBar />
     </div>
        <h2 className="mt-4">Client already exists in the database</h2>
      </div>
   
  );
};

export default ClientExistsInDatabaseView;
