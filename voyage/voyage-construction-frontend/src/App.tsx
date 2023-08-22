import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// component
import AppRoutes from "./AppRoutes";
import Toaster from "./Components/UI/Toaster";
// redux
import { setLanguage } from "./Store/Actions/langaugeActionCreator";

// helper
import "./Language/i18n";

// css
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/feather.min.css";
import "./Assets/css/style.css";
import "./Assets/css/custom.css";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

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
    <div>
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
