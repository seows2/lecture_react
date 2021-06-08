import storage from "./storage.js";

class Store {
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;
  }

  search(keyword) {
    return this.storage.productData.filter(product => 
      product.name.includes(keyword)
    );
  }
}

const store = new Store(storage);

export default store