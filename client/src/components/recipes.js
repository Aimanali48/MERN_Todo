import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(activeIndex) {
    this.setState({
      modal: !this.state.modal,
      activeModalIndex: activeIndex
    });
  }

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
                className="btn-dlt"
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
              <hr />
              <div id="modal">
                <Button color="info" onClick={() => this.toggle(index)}>Here's your recipe</Button>
                <Modal isOpen={(this.state.activeModalIndex === index) && this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                  <ModalBody>
                    {c.recipe}
                  </ModalBody>

                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Yumm!</Button>
                  </ModalFooter>
                </Modal>
              </div>

            </div>
          );
        })}
      </div>
    );
  }
}

export default Recipes;
