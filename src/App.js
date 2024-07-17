import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './shared/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import router from './shared/routes/router';

function App() {
  return (
    <>
      <ToastContainer theme="light"/>
      <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider> 
    </>
  );
}

export default App;
