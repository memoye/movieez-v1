import { useParams } from "react-router-dom"
import Card from "../../components/Card"
import HomeNav from "../../components/Navigation/HomeNav"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils"
import axios from "axios"
import Loading from "../../components/Loading"
import '../../styles/searchPage.css'

const Search = () => {
    const { query } = useParams()
    const [results, setResults] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const endpoint = 'search/multi'
    const params = { query: query, include_adult: 'false', language: 'en-US', page: '1' }


    function fetchData() {
        setIsLoading(true)
        setError('')
        const options = {
            method: 'GET',
            url: BASE_URL + endpoint,
            params: params,
            headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_TMDB_ACCESS_TOKEN
            }
        };

        axios
            .request(options)
            .then(function (response) {
                if (response.status === 200) {
                    setIsLoading(false)
                    setResults(response.data
                        .results.filter(result => (result.media_type === 'movie' || result.media_type === 'tv')))
                } else {
                    console.log('something went wrong! Please refresh the page')
                    throw new Error('something went wrong! Please refresh the page')
                }
            })
            .catch(function (error) {
                setIsLoading(false)
                setError('Something went wrong! Please try again.')
                console.error(error)
            })
    }

    useEffect(() => {
        fetchData()
    }, [query])

    return (
        <div className="searchPage">

            { isLoading ? (<div>
                <Loading />
                Loading...
            </div>)
                :
                (<>
                    <h2 className='title searchTitle'>Search results for
                        <span className="searchText">{ ` "${query && query}"` }</span>
                    </h2>
                    { error === '' ? <div div className="cardsGrid">
                        { results
                            ?.map((result) => {
                                {
                                    return (
                                        <Card
                                            key={ result.id }
                                            { ...result }
                                        />
                                    )
                                }
                            })
                        }
                    </div> :
                        <p className="error">{ error }</p>
                    }
                </>)
            }
        </div >
    )
}
export default Search