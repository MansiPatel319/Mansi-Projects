import React, { useState, useEffect } from 'react';
import ListOfPhotoPresetsComponent from './ListOfPhotoPresetsComponent';
import { useParams } from 'react-router-dom';
import { get } from "../../../network/requests";
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import Loader from "../../UI/Loader/Loader";
toast.configure();
function UserMaterialsDetailsComponent() {
  let params = useParams();
  const [materialDetails, setmaterialDetails] = useState();
  const [isLoading, setisLoading] = useState(false);

  const getMaterialDetails = () => {
    setisLoading(true);
    const url = getUrl("userMaterialDetails");
    return get(`${url}/?category=${params.id}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setmaterialDetails(data);
            }
            break;
          case 400:
            toast.error(message);
            break;
          default:
            toast.error(message);
        }
      })
      .catch(() => {
        setisLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  useEffect(() => {
    getMaterialDetails();
  }, [])

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {materialDetails && (
        <ListOfPhotoPresetsComponent materialsDetails={materialDetails.materials} materialTitle={materialDetails.category_detail.category_title} />
      )}
    </React.Fragment>
  );
}

export default UserMaterialsDetailsComponent;
