const TableHeader = (props) => 
{
    return (
        <thead>
            <tr>
                <th>{props.title}</th>
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
    
    const rows = props.characterData.todoItems.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{row.content}</td>
                <td width="1px">
                    <button onClick={() => removeCharacter(row.id)}>Delete</button>
                </td>  
            </tr>
        )  
    })
    
    return <tbody>{rows}</tbody>
}

const ItemsTable = (props) =>
{
    const { characterData, removeCharacter } = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData = {characterData} removeCharacter={removeCharacter}/>
        </table>
    )
}

export default ItemsTable