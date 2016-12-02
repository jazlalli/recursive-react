// NOTHING TO SEE HERE
// go look inside the folders
import React from 'react';
import ReactDOM from 'react-dom';

import menuData from './data.json';
import Item from './components/Item';

const selectedItems = new Map();

const onSelected = (id, quantity) => {
  selectedItems.set(id, quantity);
}

window.showBasket = function () {
  selectedItems.forEach((val, key) => {
    console.log('item:', key, val);
  });
}

const displayItems = menuData.items
  .map(item => (
    <Item
      key={item.id}
      item={item}
      leaf={(item.modifier_groups.length === 0)}
      selectedId={item.id}
      onSelected={onSelected}
    />
  ));

const App = (props) => (
  <div>
    {displayItems}
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
