import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SetName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.saveName =this.saveName.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  nameChange(e){
    this.setState({
        input: e.target.value
    })
  }

  saveName() {
      this.toggle();
      this.props.saveUserInfo(this.state.input);
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Add to queue</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Set Username to Enter Queue</ModalHeader>
          <ModalBody>
            Please enter your name:  <input type="text" onChange={(e) => this.nameChange(e)} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveName}>Save Name</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SetName;