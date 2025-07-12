import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './Components/Form';
import Edit from './Pages/Edit';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = () => (
  <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 py-6 px-4">
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-5 text-center mb-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome!</h1>
      <h2 className="text-3xl font-semibold text-gray-700">CRUD App</h2>
    </div>
    <Form />
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/create" element={<Form />} />
        <Route path='/edit' element={<Edit/>}/>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
