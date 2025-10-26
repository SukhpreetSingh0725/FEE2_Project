import { useContext } from 'react';
// 💡 Import the context object from its definition file
import { AuthContext } from './AuthContext'; 

export const useAuth = () => {
    return useContext(AuthContext);
};