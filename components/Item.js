import React, { Component } from 'react';
import Group from './Group';

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showGroup: false,
      quantity: 0,
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    const { leaf, onSelected, selectedId } = this.props;

    this.setState({
      showGroup: !this.state.showGroup,
      quantity: this.state.quantity + 1,
    }, () => {
      if (leaf) {
        onSelected(selectedId, this.state.quantity);
      }
    });
  }

  render() {
    const { item, leaf } = this.props;
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
          selectedId={`${this.props.selectedId}:${group.id}`}
          onSelected={this.props.onSelected}
        />
      ));

    const style = {
      color: 'green',
      marginLeft: top ? 0 : '20px',
      textDecoration: (leaf || quantity) ? 'underline' : 'none',
    };

    const name = top ? item.name : `> ${item.name}`;

    return (
      <div
        style={style}
        onClick={this.handleClick}
      >
        { name }
        <span>
          {(displayGroups.length > 0 && showGroup) && displayGroups}
        </span>
      </div>
    );
  }
}

export default Item;
