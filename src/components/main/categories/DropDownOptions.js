import React from "react";

function DropDownOptions(props) {
  const { options, labelText, changeHandler } = props;
  return (
    <label>
      {labelText}
      <select onChange={changeHandler} className="select">
        {options.map((optionObject) => {
          return (
            <option
              key={optionObject.id}
              id={optionObject.id}
              value={optionObject.name}
              data-testid={`${labelText}-Option`}
            >
              {optionObject.name}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export { DropDownOptions };
