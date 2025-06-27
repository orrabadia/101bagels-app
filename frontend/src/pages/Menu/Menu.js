import React, {useEffect, useReducer, useState} from 'react'
import { getAll, search, getAllTags, getAllByTag } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams, useLocation } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState = {foods: [], tags: []};

const reducer = (state, action) => {
    switch(action.type) {
        case 'FOODS_LOADED':
            return {...state, foods: action.payload};
        case 'TAGS_LOADED':
            return {...state, tags: action.payload}
        default:
            return state;
    }
}



export default function Menu() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods, tags } = state;
    const [filterTerm, setFilterTerm] = useState('');
    const { searchTerm, tag } = useParams();
    const routerLocation = useLocation();
    
    useEffect(() => {
        setFilterTerm(searchTerm || '');
    }, [searchTerm]);

    useEffect(() => {
        getAllTags().then(tags =>
            dispatch({ type: 'TAGS_LOADED', payload: tags })
        );
    }, []);

    useEffect(() => {
        getAllTags().then(tags =>
        dispatch({ type: 'TAGS_LOADED', payload: tags }));

        if (!searchTerm && !tag) {
            getAll().then(foods =>
                dispatch({ type: 'FOODS_LOADED', payload: foods }));
        } else if (tag) {
            getAllByTag(tag).then(foods =>
            dispatch({ type: 'FOODS_LOADED', payload: foods }));
        } else if (searchTerm) {
            search(searchTerm).then(foods =>
            dispatch({ type: 'FOODS_LOADED', payload: foods }));
        }
    }, [searchTerm, tag, routerLocation.pathname]);


    // useEffect(() => {
    //     const delay = setTimeout(() => {
    //     if (filterTerm.trim() === '') {
    //         // No search input: reload everything
    //         getAll().then(foods =>
    //         dispatch({ type: 'FOODS_LOADED', payload: foods }));
    //     } else {
    //         // Live search: filter locally
    //         const filtered = foods.filter(f => {
    //         const normalize = str =>
    //             str.toLowerCase().replace(/[,&]/g, '').replace(/\s+/g, ' ').trim();
    //             const itemName = normalize(f.name);
    //             const searchWords = normalize(filterTerm).split(' ');
    //             return searchWords.some(word => itemName.includes(word));});
    //         dispatch({ type: 'FOODS_LOADED', payload: filtered });
    //     }
    //     }, 300);
    //     return () => clearTimeout(delay);
    // }, [filterTerm]);

   useEffect(() => {
    const delay = setTimeout(() => {
      if (filterTerm.trim() === '' && !searchTerm && !tag) {
        getAll().then(foods =>
          dispatch({ type: 'FOODS_LOADED', payload: foods })
        );
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [filterTerm, searchTerm, tag]);

    const normalize = str =>
        str.toLowerCase().replace(/[,&]/g, '').replace(/\s+/g, ' ').trim();

    const filteredFoods = foods.filter(f => {
        const itemName = normalize(f.name);
        const searchWords = normalize(filterTerm).split(' ');
        return searchWords.some(word => itemName.includes(word));
    });

    return (
    <>
    <Search onLiveSearch={setFilterTerm} />
    <Tags tags={tags} />
    <NotFound show={filteredFoods.length === 0} showButton={false} />
    <Thumbnails foods={filteredFoods} />
    </>
  );
}
