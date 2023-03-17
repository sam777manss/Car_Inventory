import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Modal from './Modal';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTable from 'react-data-table-component';

export const apiUrl = 'https://localhost:7049/api/Cars';


export default function Admin() {

    const tableRef = useRef(null);
    const [searchByModelBrand, SetsearchByModelBrand] = useState('');
    const [users, setusers] = useState([]);
    const [data, setData] = useState([]);
    const [dataformated, setdataformated] = useState('');
    const [users1, setusers1] = useState([]);
    const [error, seterror] = useState("");
    const [records, Setrecords] = useState(data);


    useEffect(() => {

        $(document).ready(() => {
            $(tableRef.current).DataTable();
          });

        const fetchData = async()=>{
            var id = localStorage.getItem('Userid');
            const fetch =await axios.get(apiUrl + '/GetCars/'+id,{})
            fetch.data = fetch.data.map((item) => {
                const dateObj = new Date(item.year);
                const formattedDate = dateObj.toLocaleDateString('en-GB')
                return {
                    ...item,
                    year: formattedDate
                }
            });
            setusers(fetch.data);
            console.log(fetch.data);
            setData(fetch.data)
            Setrecords(fetch.data)

        }
    fetchData().catch(console.error)
    },[users1])
    function deleteUser(carId) {  
        const formData = new FormData();
        var id = localStorage.getItem('Userid');
        formData.append("userid", id);
        debugger;
        //axios.delete(apiUrl + '/DeleteCar/' + carId +" "+ id, ).then(result=>{  
        //axios.put(apiUrl + '/DeleteCar/'+ carId,id).then(result => {
            axios.post(apiUrl + '/DeleteCar/'+carId,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            }).then(result => {  
                console.log(result.data);
                setusers1(result.data)
                // alert(JSON.stringify(result.data));  
                },
                (error) => {
                    alert(error);
                });  
    }
    
    // EditUser
    
const [AddObjectEdit, SetAddObjectEdit] = useState({
    id:"",
    brand:"",
    model:"",
    year: "",
    price:"",
    new:""
});

const BrandModelSearch = (event) => {
    SetsearchByModelBrand(event.target.value)
    // axios.get(apiUrl + "/SearchCarsByBrandAndModel/" + event.target.value).then(result => {
    //     const data = result.data.map((item) => {
    //         const dateObj = new Date(item.year);
    //         const formattedDate = dateObj.toLocaleDateString('en-GB')
    //         return {
    //             ...item,
    //             year: formattedDate
    //         }
    //     });
    //     setusers(data);
    //     console.log(data);
    //   },
    //   (error) => {  
    //     alert({ error });  
    //   }
    // )
    const newData = users.filter(row => {
        return row.model.toLowerCase().includes(event.target.value.toLowerCase()) || row.brand.toLowerCase().includes(event.target.value.toLowerCase())
    })
    //Setrecords(newData);
    Setrecords(newData)
    } 
// save input values
const handleChange = (event) => {
    setdataformated(event.target.value)
    SetAddObjectEdit((prevState)=>{
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };})
    } 

const savedata=(savedata)=>{
    console.log(savedata);
    setusers1(savedata);
    }
const [showAddModal, setShowAddModal] = useState(false);
const [showModalEdit, setShowModalEdit] = useState(false);

const handleOpenEdit =(userId)=>{
    setShowModalEdit(true);

   axios.get(apiUrl + "/GetCarById/" + userId).then(result => {
        const dateObj = new Date(result.data.year);
        const formattedDate = dateObj.toLocaleDateString('en-GB')
        const parts = formattedDate.split("/");
        const year = parts[2];
        const month = parts[1];
        const day = parts[0];
        const formattedDate2 = `${year}-${month}-${day}`;
        setdataformated(formattedDate2);
        // result.data = {
        //     ...result,
        //     year: formattedDate
        // }
    SetAddObjectEdit(result.data);
      },
      (error) => {  
        alert({ error });  
      }
    )
}
const handleCloseEdit =()=>{
    setShowModalEdit(false);
}
const handleclose =()=>{
    setShowAddModal(false);
}

// Save New User
const EditSavedUser = () => {
    axios.put(apiUrl + '/UpdateCar/'+ AddObjectEdit.id,AddObjectEdit).then(result => {  
      console.log(result.data);
      setusers1(result.data)
      },
      (error) => {
        alert(error);
      }); 
      handleCloseEdit();
    }


    if(error)
    {
    return ( <div> Error:{error.message} </div>)
    }
    else {
        return(
    <div>
       
        <div className='bro' style={{width: '60%', margin: '0 auto', backgroundColor: '#f1f1f1'}}>
        <div className='text-end'><input type='text' value={searchByModelBrand} onChange={BrandModelSearch}></input> Search Car</div>

        <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">Price</th>
                <th scope="col">Type</th>
                <th scope="col">Images</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                {records.map((user) => {return(
                    <tr key={user.id}>
                        <td>{user.brand}</td>
                        <td>{user.model}</td>
                        <td>{user.year}</td>
                        <td> {user.price}</td>
                        <td> {user.new === true ? "New" : "Old"} </td>
                        <td><img src={`https://localhost:7049${user.fileName}`} alt="image" style={{width: 60, height: 60, borderRadius: '50%'}} /></td>
                        <td><button value={user.id} onClick={() => deleteUser(user.id)}>Delete</button></td>  
                        <td><button   value={user.id} onClick={() => handleOpenEdit(user.id)}>Edit</button> </td>
                    </tr>
                    )}
                )}
            </tbody>
        </table>

        <button  onClick={() => setShowAddModal(true)}>Add Car </button>&nbsp;
        <button> <Link to="/login">Login</Link> </button>

        </div>
        {/* Add Model Start*/}

        {showAddModal && <Modal handleclose={handleclose} savedata1={savedata}/>
        }
        
        {/* Add Model End */}
        {showModalEdit &&    
        <div>
            {/* =-- model start*/}
            <div  tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseEdit}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Brand<input type="text"  onChange={handleChange}  value={AddObjectEdit.brand} id="" className="form-control" name="brand"/>
                    Model<input type="text" onChange={handleChange} value={AddObjectEdit.model}  id="" className="form-control" name="model"/>
                    Year<input type="date" onChange={handleChange} value={dataformated}  id="" className="form-control" name="year"/>
                    Price<input type="text" onChange={handleChange} value={AddObjectEdit.price}  id="" className="form-control" name="price"/>
                    New<select className="form-control" value={AddObjectEdit.new} name="new" onChange={handleChange}>
                    <option value={false}>Old</option>
                    <option value={true}>New</option>
                </select></div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseEdit} data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={EditSavedUser}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            {/* --- modal end --  */}
        </div>
        }
    </div>
    )
}}


