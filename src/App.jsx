import React, {useState, useEffect} from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/Footer"
import {useUserContext} from './context/UserContext'


const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const{user, fetchUser} = useUserContext();
  const [label, setLabel] = useState('name');
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    if (user) {
      setValue(user.name.first + " " + user.name.last);
    }
  }, [user]);

  const handleUser = (e)=>{
    const dLabel = e.target.parentElement.getAttribute('data-label');
    setLabel(dLabel)

    switch(dLabel){
      case 'name':
       return setValue(user.name.first + ' ' + user.name.last )
      case 'age':
       return setValue(user.dob.age)
      case 'street':
        return setValue(user.location.street.name +' '+ user.location.street.number)
      case 'password':
        return setValue(user.login.password)
      default:
        return  setValue(user[dLabel])
    }
  }

  const addUser = ()=>{
    setUsers(prev=>[...prev, user])
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      {user && <div className="block">
        <div className="container">
          <img src={user.picture.medium} alt="random user" className="user-img" />
          <p className="user-title">My {label} is {value}</p>
          <p className="user-value"></p>
          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleUser}>
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onClick={handleUser}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onClick={handleUser}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onClick={handleUser}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onClick={handleUser}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password" onClick={handleUser}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={fetchUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user, index)=>(<tr className="body-tr" key={index}>
                  <td>{user.name.first}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob.age}</td>
              </tr>)
            )}
            </tbody>
          </table>
        </div>
      </div>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;