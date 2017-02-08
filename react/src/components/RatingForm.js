import React from 'react';

const RatingForm = props => {
  return(
    <div>
      {props.score}
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <div>
            Rating: <input className="form-control col-2" type="number" min="0.5" max="5" step="0.5"/>
          </div>
          <div>
            Review: <textarea className="form-control col-6" id="review" rows="3"/>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RatingForm;
