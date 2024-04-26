import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({children})=>{
   const [user, setUser] = useState(null);

   const fetchUser = async()=>{
        const res = await axios.get('https://randomuser.me/api/');
        setUser(res.data.results[0])
   }

   useEffect(()=>{
    fetchUser();
   }, [])

   const values = {
    user,
    fetchUser
   }

   return <UserContext.Provider value={values}>{children}</UserContext.Provider>

}

export default UserContextProvider;


export const useUserContext = ()=>{
    return useContext(UserContext)
}