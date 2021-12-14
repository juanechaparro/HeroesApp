import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { heroes } from '../data/heroes';
import { HeroCard } from '../hero/HeroCard';
import { getHeroesByName } from '../selectors/getHeroesByName';


export const SearchScreen = () => {
   
    const navigate = useNavigate();
    const location = useLocation();
    const {q= ''} = queryString.parse(location.search);

    const [formValues,handleInputChange] = useForm({searchText:q,})
    const {searchText} = formValues;
   const heroesFiltered =  useMemo(() => getHeroesByName(q), [q]);
    const handleSearch= (e)=>{
        e.preventDefault();
        // localStorage.setItem('lastPath', location.pathname + `?q=${searchText}`)
        navigate(`?q=${searchText}`);
    }
    return (
        <div>
            <h1>Busquedas</h1>
            <hr/>

            <div className = "row">
              <div className = "col-5">
                <h4> Formulario</h4>
                <form onSubmit ={handleSearch}>
                    <input type="text"
                    placeholder= "Buscar un heroe"
                    className = "form-control" 
                    name = "searchText"
                    autoComplete= "off"
                    value = {searchText}
                    onChange={handleInputChange}/>

                    <button type ="submit" className = "btn btn-outline-primary mt-1 ">
                        Buscar...
                    </button>
                
                </form>
              </div>
              <div className = "col-7">
                  <h4>Resultados</h4>
                  {
                      (q === '') ? <div className = "alert alert-info">
                          Buscar un Héroe 
                      </div>: (heroesFiltered.length === 0)&& <div className= "alert alert-danger">
                          No hay resultados: {q}
                      </div>
                  }
                  <hr />
                  {heroesFiltered.map(hero =>(
                      <HeroCard
                      key ={hero.id}
                      {...hero}
                      />
                  ))
                  }
              </div>
            </div>

        </div>
    )
}
