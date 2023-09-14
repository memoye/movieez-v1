import { imdb, rt } from "../../assets"
import '../../styles/hero.css'

const Ratings = ({ vote_average, popularity, }) => {

    return (

        <div className="ratings">
            <p className="imdb_rating"><span className="icon"><img src={ imdb } alt="imdb rating" /></span>{ `${(vote_average * 10).toFixed(1)} / 100` } </p>
            <p className="rotten_tom"><span className="icon"><img src={ rt } alt="rotten tomatos" /></span>{ `${(popularity).toFixed(1)}` } </p>
        </div>

    )
}
export default Ratings