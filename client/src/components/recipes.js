import React, { Component } from "react";
class Recipes extends Component {
  render() {
    //  console.log(this.props.data)
    // console.log(this.props.onDelete)

    return (
      <div>
        <h2 className="jumbotron heading">Recipes</h2>
        {this.props.data.map((c, index) => {
          return (
            <div className="cc" key={c._id}>
              <button
                className="btn"
                onClick={() => this.props.onDelete(c._id)}
              >
                &times;
              </button>
              <button
                className="btn-edit"
                onClick={() => this.props.onEdit(c, index)}
              >
                &#128393;
              </button>
              Recipe recommended by : &nbsp; <strong>{c.name}</strong>
              <br />
              Recipe Name:&nbsp; <strong>{c.rcpname}</strong> <br />
              <strong>Here's the recipe</strong>
              <hr /> {c.recipe}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recipes;
