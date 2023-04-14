import { Link } from "react-router-dom";

const TableHeader = () => 
{
    return (
        <thead>
            <tr>
                <th>List</th>
            </tr>
        </thead>
    )
}

const removeCharacter = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`,
    {
      method: 'DELETE',
    });
    window.location.reload(false);
  }

const TableBody = (props) => {
    
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{row.title}</td>
                {<td width="1px" >
                    <Link to = {`/todo/${row.id}`}>
                        <button >Items</button>
                    </Link>
                </td>}
                <td width="1px">
                    <button onClick={() => removeCharacter(row.id)}>Delete</button>
                </td>  
            </tr>
        )  
    })
    
    return <tbody>{rows}</tbody>
  }

const ListsTable = (props) =>
{
    const { characterData, removeCharacter } = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData = {characterData} removeCharacter={removeCharacter}/>
        </table>
    )
}

export default ListsTable