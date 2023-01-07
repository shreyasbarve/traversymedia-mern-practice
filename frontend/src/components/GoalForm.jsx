import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  const [text, setText] = useState("");

  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            placeholder='Enter your goal please'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'
            onClick={handleSubmit}
          >
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
