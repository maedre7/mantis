import React from 'react';

const Input = (props) => {

	return(
    <div className="form__group field">
      <input type="number" className="form__field" placeholder={props.placeholder}
      name={props.name} id={props.name} value={props.value} required onChange={(e) => props.onInput(e.target.value)} />
      <label for={props.name} className="form__label">{props.name}</label>
    </div>
  );
  
}

export default Input;