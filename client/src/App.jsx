import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DistrictJournalists from './pages/DistrictJournalists';
import JournalistVideos from './pages/JournalistVideos';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import Upload from "./pages/Upload";
import MyVideos from "./pages/MyVideos";
import AdminPanel from "./pages/AdminPanel";
import StatsDashboard from "./pages/StatsDashboard";
import ExportVideos from "./pages/ExportVideos";
import DistrictManager from "./pages/DistrictManager";
import Register from "./pages/Register";
import DistrictList from "./components/DistrictList";

function App() {
  return (

    <Routes>
  <Route path="/login" element={<><Navbar/><Login /><Footer/></>} />
  <Route path="/dashboard" element={<><Navbar/><Dashboard /><Footer/></>} />

  {/* Journalist-only route */}
  <Route
    path="/upload"
    element={
      <PrivateRoute roles={["journalist"]}>
        <Navbar/>
        <Upload />
        <Footer/>
      </PrivateRoute>
    }
  />

  {/* Editor-only routes */}
  <Route
    path="/district/:districtId"
    element={
      <PrivateRoute roles={["editor", "admin"]}>
        <Navbar/>
        <DistrictJournalists />
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
      path="/journalist/:userId/videos"
      element={
        <PrivateRoute roles={["editor", "admin"]}>
          <Navbar/>
          <JournalistVideos />
          <Footer/>
        </PrivateRoute>
      }
    />
    <Route
    path="/my-videos"
    element={
      <PrivateRoute roles={["journalist"]}>
        <Navbar/>
        <MyVideos />
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
    path="/admin"
    element={
      <PrivateRoute roles={["admin"]}>
        <Navbar/>
        <AdminPanel />
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
    path="/stats"
    element={
      <PrivateRoute roles={["admin"]}>
        <Navbar/>
        <StatsDashboard />
        <Footer/>
      </PrivateRoute>
    }
  />
    <Route
      path="/export"
      element={
        <PrivateRoute roles={["admin"]}>
          <Navbar/>
          <ExportVideos />
          <Footer/>
        </PrivateRoute>
      }
    />
      <Route
      path="/districtsmanage"
      element={
        <PrivateRoute roles={["admin"]}>
          <Navbar/>
          <DistrictManager />
          <Footer/>
        </PrivateRoute>
      }
    />
      <Route
      path="/register"
      element={
        <>
          <Navbar/>
          <Register />
          <Footer/>
        </>
      }
    />
      <Route
      path="/districts"
      element={
        <PrivateRoute roles={["admin","journalist", "editor"]}>
          <Navbar/>
          <DistrictList />
          <Footer/>
        </PrivateRoute>
      }
    />

    
</Routes>
    

  );
}

export default App;
