import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState()
    
    function handleEdit(){
        setIsEditing(editing => !editing)

        if(isEditing){
            onChangeName(symbol, playerName)
        }
    }
    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing){
        editablePlayerName = <input type="text" value={playerName} onChange={handleChange} required/>
    }

    return (
        <li className={isActive ? 'active': undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
    );
}
