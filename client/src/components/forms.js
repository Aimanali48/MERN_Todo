import React, { Component } from "react";
import "../styles/forms.css";
import Recipes from "./recipes";
class Forms extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.rcpname = React.createRef();
    this.recipe = React.createRef();
    this.state = {
      data: [],
      loading: true
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state)
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    fetch("/api/data")
      .then(res => res.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(err => {
        console.log(err);
      });
  };

  customRender = () => {
    if (this.state.loading) {
      return <div className="spinner" />;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, rcpname, recipe } = this.state;
    fetch("/api/data", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name, rcpname, recipe })
    }).then(() => {
      this.getAll();
    });
  };

  handleDelete = id => {
    //console.log(id)
    const confirm = window.confirm("are you sure?");
    if (confirm) {
      fetch(`/api/data/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
      }).then(res => res.text());

      const filtered = this.state.data.filter(c => c._id !== id);
      this.setState({ data: filtered });
    }
  };

  handleEdit = (c, index) => {
    this.setState({
      _id: c._id,
      name: c.name,
      rcpname: c.rcpname,
      recipe: c.recipe
    });
  };

  handleUpdate = c => {
    console.log(c._id, this.name.current.value);
    fetch(`/api/data/${c._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: this.name.current.value,
        rcpname: this.rcpname.current.value,
        recipe: this.recipe.current.value
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
      })
      .then(() => {
        this.getAll();
      });
  };

  render() {
    return (
      <div className="flex-container">
        <div className="container cover">
          <h2 className="jumbotron jumbo">Share your favourite Recipe.</h2>
          <form id="formReset" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col">
                <label htmlFor="text">Name:</label>

                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Enter Name"
                  value={this.state.name || ""}
                  onChange={this.handleChange}
                  name="name"
                  ref={this.name}
                />
              </div>
              <div className="col">
                <label htmlFor="text">Recipe Name:</label>

                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Recipe name"
                  value={this.state.rcpname || ""}
                  onChange={this.handleChange}
                  name="rcpname"
                  ref={this.rcpname}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="comment">Your Recipe Here:</label>

              <textarea
                className="form-control"
                rows="5"
                id="comment"
                value={this.state.recipe || ""}
                onChange={this.handleChange}
                name="recipe"
                ref={this.recipe}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(this.state)}>update</button>
        </div>
        <div className="recipes-section">
          <Recipes
            data={this.state.data}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          {this.customRender()}
        </div>
      </div>
    );
  }
}

export default Forms;
