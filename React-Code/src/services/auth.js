import { toast } from 'react-toastify';

toast.configure();
// const dispatch = useDispatch();

export const isAuthenticated = () => {
  const permissions = localStorage.getItem("token");
  if (permissions) {
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("is_creator");
  localStorage.removeItem("keywordData");
  localStorage.removeItem("next_url");
  localStorage.removeItem("userCreatorData");
  localStorage.removeItem("location");
  localStorage.removeItem("next_url");
}

export const tokenExpire = (errorData, history) => {
  let status;
  if (errorData === undefined) {
    status = 500;
  }
  else {
    status = errorData;
  }
  switch (status) {
    case 401:
      logout();
      // localStorage.clear();
      history.push("/");
      toast.error('Your session is expire', {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case 500:
      // toast.error('Something went wrong', {
      //   pauseOnHover: false,
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      break;
    default:
    // toast.error('Something went wrong', {
    //   pauseOnHover: false,
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }
}
