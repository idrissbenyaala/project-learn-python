import React from 'react';
import { Navigate ,useLocation} from 'react-router-dom';

const ProtectedRoute = ({ children ,  requiredRole  }) => {
 const accessToken = localStorage.getItem('accessToken');
 const role = localStorage.getItem('role');
 console.log('Access Token:', accessToken);
 console.log('Role:', role);
 const location = useLocation();
 if (!accessToken || role !== requiredRole) {
   return <Navigate to="/login" state={{ from: location }} replace />;
 }
 return children;
};

export default ProtectedRoute;