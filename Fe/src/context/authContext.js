import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../api/auth";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (data) => {
     await loginApi(data)
          .then(res => {
            const  { id, name , profilePic}  = res.data
            setCurrentUser({
              id,
              name,
              profilePic
            });
            window.location.href = '/';
            toast.success("Successfully logged in!!");
        })
          .catch(err => {
            toast.error(err.data);
        });
    //TO DO
    
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
