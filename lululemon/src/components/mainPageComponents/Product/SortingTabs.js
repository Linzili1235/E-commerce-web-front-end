import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../actions";
import { useNavigate } from "react-router-dom";
import './SortingTabs.scss'

const SortingTabs = () => {
    //////////////////////////////// SortTab ////////////////////////////////
    // handle sort tab name
    const menuRef = useRef(null)
    const [sortTab, setSortTab]  = useState('Featured')
    // handle toggle state
    const [isOn, setIsOn] = useState(false)
    const [toggleName, setToggleName] = useState('hide')

    // toggle function to display/hide the sorting tab

    useEffect(() => {
        const toggleFunc = (evt) => {
            if (menuRef.current && !menuRef.current.contains(evt.target)) {
                setIsOn(false);
            } else {
                setIsOn(isOn => !isOn);
            }
        };
        document.addEventListener('click', toggleFunc)
        isOn ? setToggleName('display') : setToggleName('hide')
        return () => {
            document.removeEventListener('click', toggleFunc)
        }
    })

    ////////////////////////////////////////////////////////////////////////

    // get data from the global store
    const products = useSelector(state => state?.productReducer?.pageProducts)
    const urlParams = useSelector(state => state?.productReducer?.params)
    const page = urlParams.pageNum;
    const sortingId = urlParams.sortingId;

    ////////////////////////////////////////////////////////////////////////
    // Fetch all products with page and sorting
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true)
    useEffect( () => {
        dispatch(actions?.productActions?.fetchProductsPageSorting(page, sortingId))
            .then(()=> setLoading( false))
    },[page, sortingId]);

    const navigate = useNavigate();
    // handle sorting changes, change sortingId
    const handleSortChange = (sortingId) => {
        actions?.filterActions?.changeSortId(dispatch)(sortingId)
            .then(()=> setLoading( false))

        navigate(`/mainPage/${sortingId}/1`);

    }


    return isLoading ? <div>Loading...</div> : (
        <>
            <div className="sortingTabs">
                {
                    !!products &&
                    <div className="options">
                        {`All Items (${!!products?.pageParams ? products?.pageParams?.totalProducts : products.products?.length})`}
                    </div>
                }
                <div className="options">Available Near You</div>
                <div className='dropdown' ref={menuRef}>
                    <a className='sort-by'>Sort by:  {sortTab}</a>
                    <div className={toggleName}>
                        <ul>
                            <li id='1'
                                data-id='1'
                                onClick={()=> {
                                    setSortTab('Featured')
                                    handleSortChange('1')
                                }}> Featured </li>
                            <li id='2'
                                data-id='2'
                                onClick={()=> {
                                    setSortTab('New Arrivals ')
                                    handleSortChange('2')
                                }}> New Arrivals </li>
                            <li id='3'
                                data-id='3'
                                onClick={()=> {
                                    setSortTab('Top rated')
                                    handleSortChange('3')
                                }}> Top rated </li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    );
};

export default SortingTabs;