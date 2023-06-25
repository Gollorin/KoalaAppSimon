// Importing components
import Row from "./Row";

function ChildTable({ data, handleDeleteRow }) {
  
    // Checking if data or data.records is empty or undefined
    if (!data || !data.records || (Array.isArray(data.records) && data.records.length === 0))
        return;

    // Get the attribute names from the first record in data.records
    const attributes = Object.keys(data.records[0].data);

    return(
        <tr>
            <td colSpan="6">

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            
                            {attributes.map((header, index) => (
                                // Render table headers based on attribute names
                                <th key={index}>{header}</th>
                            ))}

                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.records.map((childItem) => (
                            // Render Row component for each childItem
                            <Row data={childItem} handleDeleteRow={handleDeleteRow}/>
                        ))}
                    </tbody>
                </table>

            </td>
        </tr>
    )
}

export default ChildTable;
