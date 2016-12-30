import React from 'react';
import ReactDOM from 'react-dom';

import menuData from './data.json';
import Item from './components/Item';
import DataViz from './components/DataViz';
import basket from './basket';

const appStyles = {
  fontSize: '18px'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSelected = this.onSelected.bind(this);

    basket.init();

    this.state = {
      basketItems: basket._items,
    };
  }

  onSelected(item) {
    basket.addItem(item);

    this.setState({
      basketItems: basket._items,
    });
  }

  render() {
    const displayItems = menuData.items
      .map(item => (
        <Item
          root
          key={item.id}
          item={item}
          basketItem={{}}
          leaf={(item.modifier_groups.length === 0)}
          selectedId={item.id}
          onSelected={this.onSelected}
        />
      ));

    return (
      <div style={appStyles}>
        {displayItems}
        <DataViz data={this.state.basketItems} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
