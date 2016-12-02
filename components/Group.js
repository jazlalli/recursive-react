import React, { Component } from 'react';
import Item from './Item';

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showItems: false
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      showItems: !this.state.showItems
    });
  }

  render() {
    const { group } = this.props;
    const { showItems } = this.state;

    let items = [];
    if (group.modifier_options.length) {
      items = group.modifier_options;
    }

    const displayItems = items
      .map(item => (
        <Item
          key={item.id}
          item={item}
          leaf={(item.modifier_groups.length === 0)}
          selectedId={`${this.props.selectedId}:${item.id}`}
          onSelected={this.props.onSelected}
        />
      ));

    const style = {
      color: 'palevioletred',
      marginLeft: '20px',
      textDecoration: showItems ? 'underline' : 'none',
    };

    return (
      <div style={style} onClick={this.handleClick}>
        {group.name}

        <span>
          {(displayItems.length > 0 && showItems) && displayItems}
        </span>
      </div>
    );
  }
}
