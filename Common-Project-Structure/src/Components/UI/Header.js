/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { setLanguage } from '../../Store/Actions';
import AppContext from '../../Store/AppContext';
import SelectInput from './ReactSelect';

const langOption = [
  { value: 'jp', label: 'Japanese' },
  { value: 'en', label: 'English' },
];
const Header = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);
  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Nav activeKey="/" className="active">
        <Nav.Item className="navbar-nav me-auto mb-2 mb-lg-0">
          <Nav.Link className="nav-item">
            <Link to="/" className="nav-link">
              ToopTip
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/storeExample" className="nav-link">
              Global Store Example with hooks
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/reactMemo" className="nav-link">
              React Memo Example
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/reactWithOutHooks" className="nav-link">
              React Example Without useCallBack and memo
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/reactCallback" className="nav-link">
              React useCallBack Example
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/reactListingDemo" className="nav-link">
              React Listing Demo
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/reactWebPConverter" className="nav-link">
              WebP converter
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/validationCommonForm" className="nav-link">
              Validation Form
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/customhook" className="nav-link">
              Custom Hook
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <Link to="/memo_and_callback" className="nav-link">
              Memo And useCallback
            </Link>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <div
              className="nav-link"
              onClick={() => {
                localStorage.removeItem('token');
                history.push('/login');
              }}>
              Logout
            </div>
          </Nav.Link>
          <Nav.Link className="nav-item">
            <div className="nav-link">
              <SelectInput
                defaultValue={langOption[2]}
                options={langOption}
                value={langOption.find((data) => data.value === state.lang)}
                onChange={(selectedOption) => {
                  console.log('selectedOption', selectedOption);
                  setLanguage(dispatch, selectedOption.value);
                }}
                // styles={colourStyles}
              />
            </div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
export default Header;
