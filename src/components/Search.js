import React, {useEffect, useState} from 'react';
import {FormControl, InputGroup} from "react-bootstrap";

const Search = ({setUserData, AllUserdata, countPerPage,setSearchCount}) => {
    const [search, setSearch] = useState(' ')
    const [offset] = useState(0);

    // search user
    useEffect(() => {
        if (search.length > 2) {
            setUserData(AllUserdata.filter(user => {
                return user.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    || user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            }))

        } else if (search.length === 0) {
            setUserData(AllUserdata.slice(offset, offset + countPerPage))
        }
        setSearchCount(search.length)
    }, [search, AllUserdata, setUserData,setSearchCount,countPerPage,offset])
    return (
        <>
            <InputGroup>
                <InputGroup.Prepend className='search-icon'>
                    <i className="fal fa-search"> </i>
                </InputGroup.Prepend>
                <FormControl onChange={e => setSearch(e.target.value)}
                             placeholder='search...'/>
            </InputGroup>
        </>
    );
};

export default Search;
