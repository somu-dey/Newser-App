import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from
    "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import { useState } from 'react';
import { useEffect } from 'react';
// import LoadingBar from 'react-top-loading-bar'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    const capitalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const update = async () => {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        const data = await fetch(url);
        props.setProgress(30);
        const parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
          document.title = `${ capitalise( props.category)}- Newser`;
        update()
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        setLoading(true)
        const data = await fetch(url);
        const parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles)
        )
        settotalResults(parsedData.totalResults)
        setLoading(false)
    }
    return (
        <>
            <div className="text-center" style={{marginTop:'90px'}}>
                <h2>Newser Top Headlines on {capitalise(props.category)}</h2>
            </div>
            { loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className='container-fluid row '>
                        {articles.map((element) => {
                            return <div className="col-md-4 col-sm-5 px-4" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) + "....." : ""} description={element.description ? element.description.slice(0, 88) + "...." : ""} imageUrl={element.urlToImage}
                                    newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </ >
    )

}


News.defaultProps = {
    country: "in",
    pageSize: '8',
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string
}

export default News
// 9fbb6ccb0e9945f2a72f8b8d02549760