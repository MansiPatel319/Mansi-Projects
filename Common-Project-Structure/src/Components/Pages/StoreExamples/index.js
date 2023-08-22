import React, { useContext, useEffect, useState } from 'react';
// UI components
import TextInput from '../../UI/TextInput';
import MemoListing from './MemoListing';
// Store
import AppContext from '../../../Store/AppContext';
import { setMemoData } from '../../../Store/Actions';

// Helpers
import { randomStrForId } from '../../../Utils';

const StoreExamples = () => {
  const [state, dispatch] = useContext(AppContext);

  const [memo, setMemo] = useState('');
  const [description, setDescription] = useState('');
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    setMemos(state.memos);
  }, [state.memos]);

  const handleSetMemoData = () => {
    const data = {
      name: memo,
      description: description,
    };
    let clonnedData = [...memos];
    clonnedData.push(data);
    setMemoData(dispatch, clonnedData);
    setMemo('');
    setDescription('');
  };

  const handleRemove = (index) => {
    let clonnedData = [...memos];
    clonnedData.splice(index, 1);
    setMemoData(dispatch, clonnedData);
  };

  return (
    <div className="m-3">
      <h2>React hook (Global store) - useContext(), useReducer()</h2>
      <div className="mt-2">
        <span>Add New Todo</span>
        <TextInput
          type="text"
          placeholder="Enter todo name"
          name={randomStrForId()}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control mt-2"
        />
      </div>
      <div className="mt-2">
        <TextInput
          type="text"
          placeholder="Enter todo description"
          name={randomStrForId()}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {}}
          onFocus={() => {}}
          classNameStyle="form-control mt-2"
        />
      </div>
      <div className="mt-2">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSetMemoData}>
          Save
        </button>
      </div>
      <div className="mt-2 row">
        {memos.map((data, index) => (
          <MemoListing
            key={`memo_${index}`}
            name={data.name}
            description={data.description}
            handleRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreExamples;
