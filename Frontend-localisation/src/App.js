import "./App.css";
import { motion } from "framer-motion";
import {
  AccountCircleRounded,
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  BarChartRounded,
  ColorLensRounded,
  DashboardRounded,
  Search,
  SettingsRemoteRounded,
  TocRounded,
} from "@material-ui/icons";
import {
  FaStoreAlt,
  FaTree,
  FaCity,
  FaHandHoldingMedical,
  FaHospital,
  FaUserNurse,
  FaMap,
} from "react-icons/fa";
import Item from "./component/Item";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dashbord from "./Dashbord";
import Zone from "./Zone";
import Ville from "./Ville";
import Pharmacie from "./Pharmacie";
import Garde from "./Garde";
import User from "./User";
import Map from "./MAP";
import Recherche from "./Recherche";





function App() {
  const [open, setOpen] = useState(true);

  // for collapsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };

  return (
    <div className="App">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              cursor: "pointer",
            }}
          >
            <img
              src="https://comment.ma/data/pharmacie-de-garde.jpg"
              alt="profile_img"
            />
          </motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              >
                ANALYTICS
              </motion.h3>
              <Link to="/dashboard">
                <Item icon={<DashboardRounded />} name="Dashboard" />
              </Link>
              <Link to="/zone">
                <Item icon={<FaStoreAlt />} name="Zone" />
              </Link>
              <Link to="/ville">
                <Item icon={<FaCity />} name="Ville" />
              </Link>
              <Link to="/MAP">
                <Item icon={<FaMap />} name="MAP" />
              </Link>
              <Link to="/pharmacie">
              <Item
                icon={<FaHandHoldingMedical />}
                name="Gestion des Pharmacie"
              />
              </Link>
              <Link to="/garde">
              <Item icon={<FaHospital />} name="Espace des Garde" />
              </Link>
              <Link to="/user">
              <Item icon={<FaUserNurse />} name="Gestion des Uses" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="body_container">
        <Routes>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/ville" element={<Ville />} />
          <Route path="/zone" element={<Zone />} />
           <Route path="/pharmacie" element={<Pharmacie />} />
           <Route path="/garde" element={<Garde />} />
           <Route path="/user" element={<User />} />
           <Route path="/MAP" element={<Map />} />
          <Route path="/Recherche" element={<Recherche />}/>
      
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
