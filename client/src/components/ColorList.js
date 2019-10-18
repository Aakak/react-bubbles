import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorAddNew, setColorAddNew] = useState(initialColor);
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };


    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

  const saveEdit = e => {
    console.log('save edit!');
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, {color: colorToEdit.color, code: colorToEdit.code})
    .then(res => {console.log(res)})
    .catch(err => console.log(err.response));

    setEditing(false);
    const updatedColors = colors.map(color => {
      if (color.id === colorToEdit.id) {
        return {...color, color: colorToEdit.color, code: colorToEdit.code}
      } else {
        return color;
      }
    }) 
    updateColors(updatedColors);   
  };
   // make a delete request to delete this color
     // // Make a put request to save your updated color
    // // think about where will you get the id from...
    // // where is is saved right now?

  const deleteColor = color => {
    // e.preventDefault();
   axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err.response));


    const remainingColors =[];
    colors.forEach(color => {
      if (color.id !== colorToEdit.id) {
        remainingColors.push(color);
      }
    });
    updateColors(remainingColors);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}

    {/* stretch - build another form here to add a color */}

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorAddNew({ ...colorAddNew, color: e.target.value })
              }
              value={colorAddNew.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorAddNew({
                  ...colorAddNew,
                  code: { hex: e.target.value }
                })
              }
              value={colorAddNew.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
