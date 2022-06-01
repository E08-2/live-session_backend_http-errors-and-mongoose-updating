import React, { useState, useEffect } from "react";

// Let's update the project so we can give Jamie some treats (by UPDATING the document in the MongDB collection!)

const App = () => {    
        const [user, setUser] = useState({
            _id: "",
            name: "",
            age: "",
            treats: []
        })
        const [ newTreat, setNewTreat ] = useState("");

        // GET Jamie's data when App.js first renders
        useEffect(() => {
            fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }, [])

        const updateNewTreat = event => {
            setNewTreat(event.target.value);
        }

        const giveJamieNewTreat = async event => {
            event.preventDefault();

            console.log("!", user._id);

            const treat = {
                name: newTreat
            }

            const settings = {
                method: "POST",
                body: JSON.stringify(treat),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await fetch(`http://localhost:3001/users/${user._id}`, settings);
            const data = await response.json();
            console.log("New data", data)
            setUser(data);
        }

        return (
            <div>
                <h1>Jamie's Treat App!</h1>
                <form>
                    <div>
                        <label>Name:</label>
                        <input value={user.name} />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input value={user.age} />
                    </div>
                    <div>
                        <h2>Treats:</h2>
                        <ul>
                            {
                                user.treats.map(treat => <li>{treat.name}</li>)
                            }
                        </ul>
                    </div>
                </form>
                
                <h2>Give Jamie a treat!</h2>
                <input value={newTreat} onChange={updateNewTreat} />
                <button onClick={giveJamieNewTreat}>Give Jamie a new treat!</button>
            </div>
        )
    }

    export default App;