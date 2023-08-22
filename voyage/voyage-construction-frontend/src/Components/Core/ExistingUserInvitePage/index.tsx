import React from "react";
import { useNavigate } from "react-router-dom";

// component
import Button from "../../UI/Button";

// redux

// API

//
// helper

//
export interface IExistinguserLoginComponentProps { }

export default function ExistinguserLoginComponent() {
  // const { t } = useTranslations();

  const navigate = useNavigate();

  const onSubmitExistinguserLogin = async () => {
    navigate("/login");
  };

  return (
    <div className="custom-form">
      <h2>Invite Accepted</h2>
      <form>
        <div className="btn-sec in-acc">
          <Button
            buttonLabel="Log In"
            handleClick={onSubmitExistinguserLogin}
            varient="primary"
            size="small"
            className="btn theme-btn"
          />

        </div>
      </form>
    </div>
  );
}
