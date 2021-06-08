import store from "./js/Store.js"
import { formatRelativeDate } from "./js/helpers.js"

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
            keywordList: [],
            historyList: [],
        }
    }

    componentDidMount() {
        const keywordList = store.getKeywordList();
        const historyList = store.getHistoryList();
        this.setState({ keywordList, historyList })
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

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword);
        const historyList = store.getHistoryList();

        this.setState({
            searchKeyword,
            searchResult,
            submitted: true,
            historyList,
        })
    }

    handleReset() {
        this.setState({
            searchKeyword: "",
            submitted: false,
        })
    }

    handleClickRemoveHistory(event, keyword) {
        event.stopPropagation();

        store.removeHistory(keyword)
        const historyList = store.getHistoryList();
        this.setState({ historyList })
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

        const keywordList = (
            <ul className="list">
                {this.state.keywordList.map(({ id, keyword }, index) => (
                    <li key={id} onClick={() => this.search(keyword)}>
                        <span className="number">{index+1}</span>
                        <span>{keyword}</span>
                    </li>
                ))}
            </ul>
        )

        const historyList = (
            <ul className="list">
                {this.state.historyList.map(({ id, keyword, date }, index) => (
                    <li key={id} onClick={() => this.search(keyword)}>
                        <span>{keyword}</span>
                        <span className="date">{formatRelativeDate(date)}</span>
                        <button className="btn-remove" onClick={event => this.handleClickRemoveHistory(event, keyword)}></button>
                    </li>
                ))}
            </ul>
        )
        
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
                {this.state.seletedTab === TabType.KEYWORD && keywordList}
                {this.state.seletedTab === TabType.HISTORY && historyList}
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