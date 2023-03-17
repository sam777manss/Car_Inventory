import React, { useState } from 'react'
import axios from 'axios';
import { apiUrl } from './Home';



export default function Modal(props) {
  const carType = [{type:"Old"}, {type:"New"},]; // example car type


  const [AddObject, SetAddObject] = useState({
    id:"",
    brand:"",
    model:"",
    year: "",
    price:"",
    new:"",
    FormFile: ""
});

// Save New User
  const SaveNewUser = () => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(AddObject)) {
      if(key === 'FormFile')
      {
        formData.append("FormFile", value[0]);
        formData.append("FileName", value[0].name);

      }
      else{
        formData.append(key, value);
      }
    }
    console.log(formData)
    var id = localStorage.getItem('Userid');
      axios.post(apiUrl + '/AddCar/'+id,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(result => {  
        console.log(result.data);
        props.savedata1(result.data)
        // alert(JSON.stringify(result.data));  
        },
        (error) => {
            alert(error);
        }); 
        props.handleclose();
    }



// save input values
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    SetAddObject((prevState)=>{
        return {
          ...prevState,
          [name]:files ? files: value,
        };})
    } 
  return (
    <div>
        {/* =-- model start*/}
        <div >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Car</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.handleclose}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form enctype='multipart/form-data' method="post">
            <div className="modal-body">
            Brand<input type="text"  onChange={handleChange}  value={AddObject.brand} id="" className="form-control" name="brand"/>
            Model<input type="text" onChange={handleChange} value={AddObject.model}  id="" className="form-control" name="model"/>
            Year<input type="date" onChange={handleChange} value={AddObject.year}  id="" className="form-control" name="year"/>
            Price<input type="text" onChange={handleChange} value={AddObject.price}  id="" className="form-control" name="price"/>
            New
            <select className="form-control" value={AddObject.new} name="new" onChange={handleChange}>
              <option value={false}>Old</option>
              <option value={true}>New</option>
            </select>
                Image<input type="file" onChange={handleChange}  className="form-control" name='FormFile'/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.handleclose} data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={SaveNewUser}>Save changes</button>
            </div>
            </form>
            </div>
        </div>
        </div>
        {/* --- modal end --  */}
    </div>
  )
}
