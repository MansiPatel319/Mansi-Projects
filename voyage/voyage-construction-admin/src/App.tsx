import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// component
import AppRoutes from "./AppRoutes";
import Toaster from "./Components/UI/Toaster";
// redux
import { setLanguage } from "./store/Actions/langaugeActionCreator";

// helper
import "./Language/i18n";

// css

import "./Assets/css/bootstrap.min.css";
import "./Assets/css/style.css";
import "./Assets/css/global-admin.css";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
console.log('REACT_APP_BASE_URL :>> ', process.env.REACT_APP_BASE_URL);
  useEffect(() => {
    const local = navigator.language.substring(0, 2);
    if (local === "en") {
      dispatch(setLanguage("en"));
      i18n.changeLanguage("en");
    } else {
      dispatch(setLanguage("ja"));
      i18n.changeLanguage("ja");
    }
  }, []);
  return (
    <div className="global-admin">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
