import store from "./js/Store.js"

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
        }
    }
    handleChangeInput(event) {
        const searchKeyword = event.target.value;

        this.setState({
            searchKeyword,
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.search(this.state.searchKeyword);
    }

    search(keyword) {
        const searchResult = store.search(keyword);
        this.setState({
            searchResult,
        })
        console.log(searchResult);
    }

    handleReset() {
        this.setState({
            searchKeyword: ""
        })
    }

    render() {
        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                  <form
                    onSubmit={event => this.handleSubmit(event)}
                    onReset={() => this.handleReset()}
                  >
                    <input 
                        type="text"
                        placeholder="검색어를 입력하세요."
                        autoFocus
                        value={this.state.searchKeyword}
                        onChange={event => this.handleChangeInput(event)}
                    />
                    {this.state.searchKeyword.length > 0 && (
                        <button type="reset" className="btn-reset"></button>
                    )}
                  </form>
                  <div className="content">
                      {this.state.searchResult.legnth > 0 ? (
                          <ul className="result">
                              {this.state.searchResult.map(({ imageUrl, name }) => (
                                    <li>
                                        <img src={imageUrl} alt={name} />
                                        <p>{name}</p>
                                    </li>
                                )
                              )}
                          </ul>
                      ) : (
                          <div className="empty-box">검색 결과가 없습니다.</div>
                      )}
                  </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));