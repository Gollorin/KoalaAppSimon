// Importing components
import { useState } from "react";
import ChildTable from "./ChildTable";

function Row({ data, handleDeleteRow }) {

    // State variable to manage the checkbox checked state
    const [isChecked, setIsChecked] = useState(false);

    // Checking if data is empty or undefined. If so, the component returns early.
    if (!data)
        return;

    // Get the attribute names from data.data
    const attributes = Object.keys(data.data);

    return(
        <>
            <tr>
                <td>
                    {/* Render checkbox only if data has children */}
                    {Object.keys(data.children).length > 0 &&
                        <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    }
                </td>
                
                {/* Render table cells based on attribute names */}
                {attributes.map((item, index) => { return (
                    <td key={index}>{data.data[item]}</td>
                )})}

                <td>
                    {/* Render delete button with corresponding ID */}
                    <button onClick={() => handleDeleteRow(data.data["ID"])}>Delete</button>
                </td>
            </tr>

            {/* Render ChildTable components if the checkbox is checked */}
            {isChecked &&
                <>
                    <ChildTable data={data.children.has_nemesis} handleDeleteRow={handleDeleteRow} />
                    <ChildTable data={data.children.has_secrete} handleDeleteRow={handleDeleteRow} />
                </>
            }
        </>
    );
}

export default Row;