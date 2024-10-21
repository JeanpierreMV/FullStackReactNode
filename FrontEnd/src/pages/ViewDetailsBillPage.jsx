import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import ViewDetailsBill from '../components/ViewDetailsBill';

const ViewDetailsBillPage = () => {
    return (
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Navbar />
          <main className="formContainer">
            <ViewDetailsBill />
          </main>
        </div>
      </div>
    );
  };

export default ViewDetailsBillPage;
