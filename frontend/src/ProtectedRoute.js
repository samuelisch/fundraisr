import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './App';

const ProtectedRoute = ({ children }) => {
  const { setUser } = useContext(UserContext)

  const toggleLogin = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    return <Navigate to="/login" />
  }

  const authenticated = window.localStorage.getItem('loggedUser');

  return authenticated ? children : toggleLogin()
}

export default ProtectedRoute