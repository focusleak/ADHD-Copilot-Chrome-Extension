import { useEffect, useState } from "react";

const useSearch = () => {
    const [queryString, setQueryString] = useState('');
    const handleInput = useCallback((event) => {
        setQueryString(event.target.value);
    }, []);
    const handleSearch = useCallback(
        (event) => {
            search(queryString);
        },
        [queryString]
    );
    const handleKeyUp = useCallback(
        (event) => {
            if (event.code == 'Enter') {
                search(queryString);
            }
        },
        [queryString]
    );
    return { queryString, handleInput, handleSearch, handleKeyUp };
};
export default useSearch;