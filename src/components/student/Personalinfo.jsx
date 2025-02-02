import React, { useContext, useEffect, useState } from 'react';
import MainPage from '../../Mainpage';
import { StudentContext } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../../database/Client';

function Personalinfo() {
  const navigate = useNavigate();
  const { Authenticated, setAuthenticated, Email } = useContext(StudentContext);
  const [userData, setUserData] = useState(null); 
  useEffect(() => {
    if (!Authenticated) {
      navigate('/');
    } else {
      supabase
        .from('student-bio')
        .select('*')
        .eq('email', Email)
        .then((response) => {
          const fetchedData = response.data[0]; // Assuming there's only one user per email
          setUserData(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message);
        });
    }
  }, [Authenticated, Email, navigate]);

  const { name, rollno, year, dept, section, email } = userData || {};
  return (
    <div>
      <MainPage />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1279px] h-[645px] bg-white rounded-xl p-4">
        <div className="flex items-center">
          <img src="./images/WireframeImagePlaceholder.png" alt="Profile Photo" className="p-4 w-15 h-30" />
          <div className="mt-6 px-6">
            <h2 className="text-2xl mb-4 text-gray-700 font-bold">PERSONAL INFORMATION</h2>
            <div className="flex items-center">
              <label className="block text-gray-700 font-bold mb-1 mr-28">
                <h5>Name</h5>
              </label>
              <span className="mb-1">
                <h5>{name}</h5>
              </span>
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-bold mb-1 mr-12">
                <h5>Roll_Number</h5>
              </label>
              <span className="mb-1">
                <h5>{rollno}</h5>
              </span>
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-bold mb-1 mr-2">
                <h5>Year/Class/Section</h5>
              </label>
              <span className="mb-1">
                <h5>{year}/{dept}/{section}</h5>
              </span>
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-bold mb-1 mr-28">
                <h5>Email</h5>
              </label>
              <span className="mb-1">
                <h5>{Email}</h5>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
                    <button className="button1 absolute bottom-40 left-25 mt-6 py-2 px-4 w-15 h-11 rounded-md font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-purple-300 text-black">Semester 3</button>
                    <button className="button1 absolute bottom-40 right-25 mt-6 py-2 px-4 w-15 h-11 rounded-md font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-purple-300 text-black">Semester 4</button>
                    <button className="button1 absolute bottom-20 left-25 mt-3 py-2 px-4 w-15 h-11 rounded-md font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-purple-300 text-black">Semester 5</button>
                    <button className="button1 absolute bottom-20 right-25 mt-3 py-2 px-4 w-15 h-11 rounded-md font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-purple-300 text-black">Semester 6</button>
                </div>
            </div>
        </div>
    )
}
export default Personalinfo;