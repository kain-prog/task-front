import * as React from 'react'
import { useState } from "react";
import { NavLink } from 'react-router-dom';

export default function SideBar(){

  const [open, setOpen] = useState(true);

  return (
    <>
      <div id="side-bar" className={`position-relative aside-menu d-flex flex-column flex-shrink-0 p-2 text-white bg-dark t-300 ${open ? "w-o" : "w-c"} `} >
        <div id="sec" className={`my-3 d-flex align-items-center bg-dark text-white ${!open && 'justify-content-center'}`}>
          <i className={`bi bi-person-video3 fs-3 ${open ? "ms-2" : "" }`}></i>
          <h1 className={`f-letter fs-4 ms-3 m-auto widspace ${open ? "open" : "closed" } `}> - <span>T</span>asks</h1>
        </div>
        <hr id="hr"/>
        <ul id="list" className="nav nav-pills flex-column mt-5 mb-auto">
          <li className="nav-item w-100 mb-2">

            <NavLink to="/" className={`text-decoration-none text-light`}>

            {({ isActive }) => (
              <div id="home-list" className={`d-flex align-items-center hov-custom c-pointer text-light nav-link ${isActive ? `active` : undefined } ${!open && 'justify-content-center'}`} aria-current="page">
                <i className="bi bi-house-door"></i>
                <p className={`ms-2 m-auto widspace ${open ? "open" : "closed" } `}>My Tasks</p>
              </div>
            )}
              
            </NavLink>
            
          </li>

                {/* Botão de navegação, ex. comentado: */}

          {/* <li className="w-100 mb-2"> 
            <div id="newTask-list" className={`d-flex align-items-center hov-custom c-pointer nav-link text-white ${!open && 'justify-content-center'}`}>
              <i className="bi bi-plus-lg"></i>
              <p className={`ms-2 m-auto widspace ${open ? "open" : "closed"} `}>Create Task</p>
            </div>
          </li> */}
        </ul>
        <hr id="hr2"/>
        <div id="footer">
          <p className="fs-7 mb-0 text-center"> Created by:</p>
          <p className="fs-7 mb-0 text-center">Matheus Santos</p>
        </div>

        <div onClick={() => setOpen (!open)} className={`position-absolute local ${!open && "rotate-180"} t-300`} >
          <i className={`bi bi-chevron-double-left c-pointer fs-4 text-dark`}></i>
        </div>       
      </div>
      
    </>
  );
}