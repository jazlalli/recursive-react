import React, { Component } from 'react';
import Modal from 'react-modal';
import Group from './Group';

const itemStyle = {
  position: 'relative',
  margin: '5px 0',
  padding: '10px',
  border: '1px solid',
  borderRadius: '3px',
  fontWeight: 'bold',
  color: '#555',
  textDecoration: 'none'
};

const buttonStyle = {
  margin: '20px',
  width: '120px',
  height: '42px',
  fontSize: '16px',
  border: 'none',
  borderRadius: 0,
  background: 'teal',
  color: 'white'
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showGroup: false,
      quantity: 0,
    };
  }

  closeModal = evt => {
    this.setState({
      showGroup: false,
    }, () => {
      this.props.onSelected(this.props.basketItem);
    });
  }

  handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    const {
      root,
      leaf,
      selectedId,
      basketItem,
    } = this.props;

    const {
      quantity,
    } = this.state;

    this.setState({
      showGroup: !this.state.showGroup,
      quantity: quantity + 1,
    }, () => {
      if (root || leaf) {
        basketItem[String(selectedId)] = this.state.quantity;
      }

      if (root && leaf) {
        this.props.onSelected(this.props.basketItem);
      }
    });
  }

  render() {
    const { item, root, leaf, basketItem } = this.props;
    const { showGroup, quantity } = this.state;

    let groups = [];
    if (item.modifier_groups.length) {
      groups = item.modifier_groups;
    }

    const displayGroups = groups
      .map(group => (
        <Group
          key={group.id}
          group={group}
          basketItem={basketItem}
          selectedId={`${this.props.selectedId}-${group.id}`}
          onSelected={this.props.onSelected}
        />
      ));

    const style = Object.assign({}, itemStyle, {
      borderColor: quantity > 0 ? 'palevioletred' : '#c0c0c0'
    });

    const children = (
      <span>
        {(displayGroups.length > 0 && showGroup) && displayGroups}
      </span>
    );

    return (
      <div
        style={style}
        onClick={this.handleClick}
      >
        { `${(leaf && quantity > 0) ? quantity+'x' : '' } ${item.name}` }
        <div style={{
          fontSize: '11px',
          fontWeight: '200'
        }}>{item.description}</div>

        {root && displayGroups.length > 0
          ? (
            <Modal
              shouldCloseOnOverlayClick
              isOpen={showGroup}
              contentLabel={item.name}
              onRequestClose={this.closeModal}
            >
              {children}
              <button
                style={buttonStyle}
                onClick={this.closeModal}
              >
                Confirm
              </button>
            </Modal>
          )
          : children}
      </div>
    );
  }
}

export default Item;
