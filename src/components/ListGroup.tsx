function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Daphne"];
  //.map in JS takes items in an array and maps them to a variable


  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {
          //in JSX, you can only use html elements or other react components. So, you need to add curly braces to the following:
        }
        {items.map((item, index) => (
          //TODO - each item needs a key (unique ID). Once the data is pulled in,
          //the item in curly braces should be changed to the item ID
          <li
            className="list-group-item"
            key={item}
            //TODO change this to where when you click on it, it shows the client
            onClick={() => console.log(item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
