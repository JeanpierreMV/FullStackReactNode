import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import ViewDetailsAnalysis from '../components/ViewDetailsAnalysis';


const ViewDetailsAnalysisPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <ViewDetailsAnalysis />
        </main>
      </div>
    </div>
  );
};

export default ViewDetailsAnalysisPage;
