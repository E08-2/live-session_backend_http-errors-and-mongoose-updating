import React, { useState } from "react";

const App = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [users, setUsers] = useState([]);

    const updateName = event => {
        const newName = event.target.value;
        setName(newName);
    }

    const updateAge = event => {
        const newAge = event.target.value;
        setAge(newAge);
    }

    const submitData = async event => {
        event.preventDefault();

        const user = {
            name: name,
            age: age
        }

        const settings = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Handle the response using async-await syntax!
        const response = await fetch("http://localhost:3001/users", settings);

        try {
            // If the request was successful
            if (response.ok) {
                const data = await response.json();
                console.log("Response data =", data);
                setUsers(data);
                setName("");
                setAge("");
            } else {
                // If the request was unsuccessful
                const errObj = await response.json();
                throw new Error(errObj.message);
            }
        } catch (err) {
            alert(err.message);
            setName("");
            setAge("");
        }

        //     fetch("http://localhost:3001/users", settings)
        //     .then(response => {
        //         // If the response tells us that the request succeeded...
        //         if (response.ok) {
        //             // "Translate" the response, and go to the next "then" handler
        //             return response.json();
        //         } else {
        //             // ! There was an error in the server!
        //             // "Translate" the response
        //             return response.json()
        //             .then(errObj => {
        //                 throw new Error(errObj.message);
        //             })
        //         }
        //     })
        //     .then(data => {
        //         console.log("Response data =", data);
        //         setUsers(data);
        //         setName("");
        //         setAge("");
        //     })
        //     .catch(err => {
        //         alert(err.message);
        //         setName("");
        //         setAge("");
        //     })
        }

        const deleteLastUser = () => {

            // As well as GET and POST HTTP requests (plus some others we will discuss later!)...
            // We can also send a DELETE HTTP request, when we want to delete a resource in our db
            const settings = {
                method: "DELETE"
            }

            // Tell the server to delete the last user added
            fetch("http://localhost:3001/users", settings)
                .then(response => response.json())
                .then(data => setUsers(data));
        }

        return (
            <div>
                <form onSubmit={submitData}>
                    <div>
                        <label>Name</label>
                        <input onChange={updateName} value={name} />
                    </div>
                    <div>
                        <label>Age</label>
                        <input onChange={updateAge} value={age} />
                    </div>
                    <div>
                        <ul>
                            {
                                users.map(user => <li>{user.name}, {user.age}</li>)
                            }
                        </ul>
                    </div>
                    <button>Click me!</button>
                </form>
                <button onClick={deleteLastUser}>Delete the last created user!</button>
            </div>
        )
    }

    export default App;