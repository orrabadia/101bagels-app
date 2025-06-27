import React, {useState, useEffect} from 'react'
import classes from './search.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function Search({onLiveSearch}) {
    const navigate = useNavigate();
    const { searchTerm } = useParams();
    const [term, setTerm] = useState(searchTerm || '')

    useEffect(() => {
        setTerm(searchTerm || '');
        onLiveSearch?.(searchTerm || '');
    }, [searchTerm, onLiveSearch]);

  /* Trigger live search and handle navigation */
    useEffect(() => {
        const delay = setTimeout(() => {
            onLiveSearch?.(term);
            if (term.trim() === '') {
                navigate('/menu');
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [term, onLiveSearch, navigate]);
    
    const search = async() => {
        term.trim() ? navigate('/menu/search/' + term) : navigate('/menu');
    };

    return <div className={classes.container}>
        <input type='text' placeholder='Search Our Menu!'
            onChange={e => setTerm(e.target.value)}
            onKeyUp = { e => e.key === 'Enter' && search()}
            >
        </input>
    </div>
}
