import '../../App.css';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { FaUserAlt, FaUsers, FaHistory } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Router, Link } from 'react-router-dom';
function Footer() {
  return (
      <Container fluid className='footer'>
        <ul className='d-flex'>
            <li className='mx-2'>
              <Link style={{ textDecoration: 'none', color:"#8f4ED3"}} to="/groups" >
              <div className="footer-icon">
                <IconContext.Provider value={{ style: { fontSize: '20px' }, className: "global-class-name" }}>
                  <FaUsers />
                </IconContext.Provider>
              </div>
                <div>Groups</div>
              </Link>
            </li>
            <li className='mx-2'>
              <Link style={{ textDecoration: 'none', color:"#8f4ED3"}} to="friends" >
                <div className="footer-icon">
                  <IconContext.Provider value={{ style: { fontSize: '20px' }, className: "global-class-name" }}>
                    <FaUserAlt />
                  </IconContext.Provider>
                </div>
              <div>Friends</div>
              </Link>
            </li>
            <li className='mx-2'>
              <Link style={{ textDecoration: 'none', color:"#8f4ED3"}} to="activity" >
              <div className="footer-icon">
                <IconContext.Provider value={{ style: { fontSize: '20px' }, className: "global-class-name" }}>
                  <FaHistory />
                </IconContext.Provider>
              </div>
              <div>Activity</div>
              </Link>
            </li>
            <li className='mx-2'>
              <Link style={{ textDecoration: 'none', color:"#8f4ED3"}} to="/" >
              <div className="footer-icon">
                <IconContext.Provider value={{ style: { fontSize: '20px' }, className: "global-class-name" }}>
                  <FaCircleUser />
                </IconContext.Provider>
              </div>
              <div>Account</div>
              </Link>
            </li>
        </ul>
      </Container>
  )
}

export default Footer;
