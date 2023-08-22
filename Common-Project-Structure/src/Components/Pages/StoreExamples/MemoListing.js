import React from 'react';
import { Card } from 'react-bootstrap';

// css and image
import allImgPaths from '../../../Assets/AppImages';

const MemoListingComponent = (props) => {
  const { name, description, handleRemove } = props;

  return (
    <div className="col-md-4 mb-2">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-end">
            <img
              style={{ width: '20px' }}
              src={allImgPaths.binIcon}
              alt="bin"
              onClick={handleRemove}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const MemoListing = React.memo(MemoListingComponent);
export default MemoListing;
