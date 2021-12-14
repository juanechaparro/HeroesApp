import {useMemo} from 'react'
import { useParams,Navigate,useNavigate } from 'react-router-dom'
import { getHeroById } from '../selectors/getHeroById';

export const HeroScreen = () => {
    const navigate = useNavigate()
    const {heroId} = useParams();
    console.log(heroId);
    // const hero = getHeroById(heroId);
    const hero = useMemo(() => {return getHeroById(heroId)}, [heroId])
   
    if ( !hero){
        return <Navigate to = '/' />
    }
    const{id, alter_ego, first_appearance, publisher,superhero, characters} = hero;
    const imagePath =`/assets/${id}.jpg`
    
    const handleReturn = () =>{
        return navigate(-1);
    }
    return (

        <div className = "row mt-5">
            <div className = "col-4">
                <img src={imagePath}
                 alt={superhero}
                 className = "img-thumbnail animate__animated animate__fadeInLeft"
                 />
            </div>
            <div className = "col-8">
                <h3>{superhero}</h3>
                <ul className ="list-group list-group-flush">
                    <li className = "list-group-item">
                        <b>Alter ego:</b> {alter_ego}
                       
                    </li>
                    <li className = "list-group-item">
                    <b>Publisher:</b> {publisher}
                    </li>
                    <li className = "list-group-item">
                    <b>First Apperance:</b> {first_appearance}
                    </li>
                </ul>
                <h5 className= "mt-5">Characters</h5>
                <p>{characters}</p>
                <button className = "btn btn-outline-info"
                onClick = {handleReturn}> return</button>
            </div>
        </div>
    )
}
