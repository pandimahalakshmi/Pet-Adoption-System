import { useState } from "react";

function AddPet() {
  const [pet, setPet] = useState({});

  const submit = (e) => {
    e.preventDefault();

    let pets = JSON.parse(localStorage.getItem("userPets")) || [];
    pets.push({ ...pet, id: Date.now() });

    localStorage.setItem("userPets", JSON.stringify(pets));

    alert("Pet Added");
  };

  return (
    <div className="container mt-4">
      <h2>Add Pet</h2>

      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Name"
          onChange={e=>setPet({...pet,name:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Type"
          onChange={e=>setPet({...pet,type:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Breed"
          onChange={e=>setPet({...pet,breed:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Age"
          onChange={e=>setPet({...pet,age:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Image URL"
          onChange={e=>setPet({...pet,image:e.target.value})}/>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default AddPet;