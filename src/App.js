// Importing components
import { useState } from 'react';

import Row from './models/Row';
import JsonData from './models/Data';

import './App.css';

function App() {
  // State variable to store data
  const [data, setData] = useState(null);

  // Function to handle data change when a file is selected
  const ChangeData = (e) => {
    const file = e.target.files[0];

    // Checking if event have some files
    if (e.target.files.length < 1)
      return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const parsedData = JSON.parse(content);

      // Updating the data state with the parsed data
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  // Function to handle row deletion
  const handleDeleteRow = (rowId) => {
    // Recursive function to find and delete the row from data
    const deleteItem = (items) => {

      for (let i = 0; i < items.length; i++) {
        if (items[i].data.ID === rowId) {
          // Removing the item from the array
          items.splice(i, 1);

          return true;
        } else if (items[i].children) {

          const childKeys = Object.keys(items[i].children);

          for (const childKey of childKeys) {
            const child = items[i].children[childKey];

            if (child.records && deleteItem(child.records)) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Creating a new copy of data and deleting the row
    const newData = [...data];
    deleteItem(newData);

    // Updating the data state with the modified data
    setData(newData);
  };

  // Function to populate data with default JSON data
  const MakeData = () => {
    setData(null);
    setData(JsonData);
  };

  // Header component
  const AppHeader = () => {
    return (
      <header>
        <input type='file' accept='*.json' onChange={(e) => ChangeData(e)} />
        <button onClick={MakeData}>Data On Click</button>
      </header>
    );
  };

  // Render the header if data is not available
  if (!data) {
    return AppHeader();
  }

  // Get the attribute names from the first data item
  const attributes = Object.keys(data[0].data);

  return (
    <>
      {AppHeader()}
      <main>
        <table>
          <thead>
            <tr>
              <th></th>
              {attributes.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              // Render Row component for each item in data
              <Row data={item} handleDeleteRow={handleDeleteRow} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
