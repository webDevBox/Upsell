import React from "react";
import {NavLink} from "react-router-dom"

const context ='home';
export default function Header() {
  return (
        <>
            <div>
          <div className="Polaris-Card">
            <div>
              <div className="Polaris-Tabs__Wrapper">
                
                <ul role="tablist" className="Polaris-Tabs">
                  <li className="Polaris-Tabs__TabContainer li-home" role="presentation">
                    <NavLink to={"/"} role="tab" type="button" id="homeView"
                        className={(context == 'home') ? 'Polaris-Tabs__Tab Polaris-Tabs__Tab--selected' : 'Polaris-Tabs__Tab'}>
                        <span className="Polaris-Tabs__Title">Home</span>
                    </NavLink>
                  </li>
                  <li className="Polaris-Tabs__TabContainer li-analytics" role="presentation">
                    <NavLink to={"/analytics"} role="tab" type="button" id="analyticsView"
                        className={(context == 'analytics') ? 'Polaris-Tabs__Tab Polaris-Tabs__Tab--selected' : 'Polaris-Tabs__Tab'}>
                        <span className="Polaris-Tabs__Title ">Analytics</span>
                    </NavLink>
                  </li>
                  <li className="Polaris-Tabs__TabContainer li-settings" role="presentation">
                    <NavLink to={"/settings"} role="tab" type="button" id="settingsView"
                        className={(context == 'settings') ? 'Polaris-Tabs__Tab Polaris-Tabs__Tab--selected' : 'Polaris-Tabs__Tab'}>
                        <span className="Polaris-Tabs__Title ">Settings</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              
              </div>
              
            </div>
          </div>
          <div id="PolarisPortalsContainer">
            <div data-portal-id="popover-Polarisportal9"></div>
          </div>
      </>
  );
}