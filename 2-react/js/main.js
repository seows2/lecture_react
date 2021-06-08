import store from "./js/Store.js"

const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
};

const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어"
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            seletedTab: TabType.KEYWORD,
        }
    }
    handleChangeInput(event) {
        const searchKeyword = event.target.value;
        if (searchKeyword.length <= 0 && this.state.submitted) {
            return this.handleReset();
        }
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
            submitted: true,
        })
    }

    handleReset() {
        this.setState({
            searchKeyword: "",
            submitted: false,
        })
    }

    render() {
        const searchForm = (
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
        )

        const searchResult = (
            this.state.searchResult.length > 0 ? (
                <ul className="result">
                    {this.state.searchResult.map(({ id, imageUrl, name }) => (
                        <li key={id}>
                            <img src={imageUrl} alt={name} />
                            <p>{name}</p>
                        </li>
                    )
                    )}
                </ul>
            ) : (
                <div className="empty-box">검색 결과가 없습니다.</div>
            ));

        const tabs = (
            <>
                <ul className="tabs">
                    {Object.values(TabType).map(tabType => {
                        return (
                            <li 
                                className={this.state.seletedTab === tabType ? "active" : ""}
                                key={tabType}
                                onClick = {() => this.setState({seletedTab: tabType})}
                            >
                                {TabLabel[tabType]}
                            </li>
                        )
                    })}
                </ul>
                {this.state.seletedTab === TabType.KEYWORD && <div>"추천 검색어"</div>}
                {this.state.seletedTab === TabType.HISTORY && <div>"최근 검색어"</div>}
            </>
        )

        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {searchForm}
                    <div className="content">
                        {this.state.submitted ? searchResult : tabs}
                    </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));