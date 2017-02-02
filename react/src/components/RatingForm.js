import React from 'react';

const RatingForm = props => {
  return(
    <div>
      {props.score}
      <form onSubmit={props.handleSubmit}>
        <div className="form-group row">
          <label className="col-2 col-form-label">Rating</label>
          <div className="col-2">
            <input className="form-control" type="number" min="0.5" max="5" step="0.5"/>
          </div>
          <div className="col-10">
            <label htmlFor="review">Review</label>
            <textarea className="form-control" id="review" rows="3"/>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RatingForm;
