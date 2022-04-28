import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import defaultImg from "./news-default.jpeg"
export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
   
    this.state = { articles: [], loading: true, page: 1, totalArticles: 0 };
    
  }

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
    let page = this.state.page + 1;
    let NEWS_LINK = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(NEWS_LINK);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      page: page,
      totalArticles: parsedData.totalResults,
    });
  };

  async updatePage(page) {
   
    this.props.setProgress(10)
    let NEWS_LINK = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pageSize=${this.props.pageSize}`;
    document.title = `NewsPanda | ${this.props.category.toUpperCase()}`
    let data = await fetch(NEWS_LINK);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      loading: false,
      page: page,
      totalArticles: parsedData.totalResults,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updatePage(this.state.page);
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:"90px",marginBottom:"25px"}} >NewsPanda - Today's Top Headlines</h1>
        {this.state.loading && <Loading className="my-4"></Loading>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Loading />}
          style={{ overflowX: "hidden" }}
        >
          <div className="row">
            
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
