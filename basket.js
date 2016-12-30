const basket = {
  init(data) {
    data = data || {}
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }

    this._items = {};
  },

  addItem(item) {
    this._items = Object.assign({}, this._items, item)
    console.log(this._items);
  }
}

export default basket;
