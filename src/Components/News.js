import React, { Component } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    callBackFunction: () => {},
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    callBackFunction: PropTypes.func,
  };

  articles = [
    {
      source: { id: "news24", name: "News24" },
      author: "pancham khajekar",
      title:
        "Cricket SA wants to 'get to the bottom' of the Nikwe regestration concern, says CEO | sport",
      description:
        "Acting Cricket South Africa CEO Pholetsi Moseki says the board is concerned about the issues former proteas assistant coach Enoch Nikwe raised in his resignation",
      url: "http://www.news24.com/sport/Cricket/Proteas/Cricket-sa-wants-to-get-to-the-bottom-of-nikwe-registration-concerns-says-ceo-20210826",
      urlToimage:
        "https://cdn.24.co.za/files/Cms/General/d/10743/97d776dc91734e98906c0e1b7f3b1afa.jpg",
      publishedAt: "2021-08-26T11:40:16+00:00",
      content:
        "<ul><li>Nkwe voiced concerns with the current culture and working... [+3497 chars]",
    },
    {
      source: { id: "news24", name: "News24" },
      author: "pancham khajekar",
      title:
        "Cricket SA wants to 'get to the bottom' of the Nikwe regestration concern, says CEO | sport",
      description:
        "Acting Cricket South Africa CEO Pholetsi Moseki says the board is concerned about the issues former proteas assistant coach  Enoch Nikwe raised in his resignation",
      url: "http://www.espncricinfo.com/story/_/id_28970907/learned-watching-1992-world-cup-final-full-again",
      urlToimage:
        "https://th.bing.com/th/id/OIP.mQv5x97qtno9t08G-Wm_cAHaEK?pid=ImgDet&rs=1",
      publishedAt: "2021-08-26T11:40:16+00:00",
      content:
        "<ul><li>Nkwe voiced concerns with the current culture and working... [+3497 chars]",
    },
  ];
  constructor() {
    super();
    console.log("hello im constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      category: this.props?.category,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c043003fabef411fa849addccacc6aa5&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("data===>", parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c043003fabef411fa849addccacc6aa5&page=1&pageizSe=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("data===>", parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c043003fabef411fa849addccacc6aa5&page=2&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log("data===>", parsedData);
      this.setState({
        page: this.state.page + 2,
        articles: parsedData.articles,
      });
    }
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c043003fabef411fa849addccacc6aa5&page=2&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("data===>", parsedData);
    let newdata = [...this.state.articles, ...parsedData];

    this.setState({
      page: this.state.page + 2,
      articles: newdata,
    });
  };

  render() {
    return (
      <div className="container my-4">
        {/* <button onClick={() => this.increaseValueByOne()}>Click me</button> */}
        <h1 className="text-center">{this.state.category}</h1>
        <InfiniteScroll
          dataLength={this.state.articles && this.state.articles.length}
          next={() => this.fetchMoreData()}
          hasMore={this.state.articles?.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems
                        title={element.title && element.title.slice(0, 43)}
                        description={
                          element.description &&
                          element.description.slice(0, 88)
                        }
                        imgUrl={element.urlToImage && element.urlToImage}
                        url={element.url}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
