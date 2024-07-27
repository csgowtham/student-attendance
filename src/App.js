import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import UpdateAttendance from './components/UpdateAttendance';
import SideBar from './components/SideBar';
import './index.css';
import AttendanceReport from './components/AttendanceReport';

const App = () => {
  return (<>
      <div id="wrapper">
      
        <BrowserRouter>
        <SideBar />
              <Routes>
                <Route path="/" element={<AddStudent />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/update-attendance" element={<UpdateAttendance />} />
                <Route path="/attendance-report" element={<AttendanceReport />} />
              </Routes>
        </BrowserRouter>

      </div>
    </>
    
  );
};

export default App;
