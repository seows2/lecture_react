import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js"
import SearchResultView from "./views/SearchResultView.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
  const store = new Store(storage);

  const views = {
    searchFormView : new SearchFormView(),
    searchResultView : new SearchResultView(),
  };

  new Controller(store, views);
}
