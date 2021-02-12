import React, { useEffect, useRef} from "react";
import { getSelectElementWidth } from "../../../utils/css-styles-utils";

function DropDownOptions(props) {
  const { options, labelText, changeHandler } = props;
  const selectRef = useRef(null);
  useEffect(() => {
    if(selectRef.current){
      selectRef.current.style.width = getSelectElementWidth();
    }
  }, [])
  return (
    <label>
      {labelText}
      <select onChange={changeHandler} className="select" id="select" ref={selectRef}>
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