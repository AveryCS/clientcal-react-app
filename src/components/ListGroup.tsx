import { useState } from "react";
import { Link } from 'react-router-dom';

interface Props {
  items: string [];
  heading: string;
}

function ListGroup({items, heading}: Props) {
 
  //.map in JS takes items in an array and maps them to a variable

  const[selectedIndex, setSelectedIndex]  = useState(-1)



   return (
     <>
       <h1>Cities</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {
          //in JSX, you can only use html elements or other react components. So, you need to add curly braces to the following:
        }
        {items.map((item, index) => (
          //TODO - each item needs a key (unique ID). Once the data is pulled in,
          //the item in curly braces should be changed to the item ID
          <li
            className={selectedIndex === index ? 'list-group-item active' :'list-group-item'}
            key={item}
            //TODO change this to where when you click on it, it shows the client
            onClick={() => {setSelectedIndex(index);}}
          >
            {item}
          </li>
        ))}
      </ul>  
    </>
  );


  

}
export default ListGroup;
