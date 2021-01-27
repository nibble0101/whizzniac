import React from "react";

function DropDownOptions(props) {
  const { options, labelText, changeHandler } = props;
  return (
    <label>
      {labelText}
      <select onChange={changeHandler}>
        {options.map((optionObject) => {
          return (
            <option key={optionObject.id} id={optionObject.id} value = {optionObject.name}>
              {optionObject.name}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export { DropDownOptions };