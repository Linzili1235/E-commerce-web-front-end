import {useDispatch, useSelector} from "react-redux";
import "./NextPage.scss"
import React, {useState} from "react";
import actions from "../../../actions";
import {useNavigate} from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
export const NextPage = () => {
    const navigate = useNavigate()
    const urlParams = useSelector(state => state?.productReducer?.params)
    let page = parseInt(urlParams.pageNum);
    const sortingId = urlParams.sortingId;
    const [number, setNumber] = useState(page);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    const filters = useSelector(state => state?.productReducer?.filters)

    const handleInputChange = (event) => {
            const value = parseInt(event.target.value);
            if (!isNaN(value)) {
                setNumber(value);
            }
        };

    const handlePagePlusOne = () => {
        if (page < 5) {
            // handle page when loading and avoid double click
            setLoading(true)
            const temp = ++page
            navigateToPage(temp).then()
        }
        }
        const handlePageMinusOne = () => {
            if (page > 1) {
                setLoading(true)
                const temp = --page
                navigateToPage(temp).then()
            }
        }
        const navigateToPage = async (page) => {
            setNumber(page)
            await actions?.filterActions?.changePageNum(dispatch)(page)
            await dispatch(actions?.productActions?.fetchProductsPageSorting(page, sortingId, filters))
                .then(()=> setLoading( false))
            navigate(`/mainPage/${sortingId}/${page}`)
            window.scrollTo(0, 400);
        }


    return <>
        {isLoading && <div className="container-background"></div>}
    <div className="changePage">
        {page > 1 && <KeyboardArrowLeftIcon onClick={handlePageMinusOne} fontSize={"large"} className="leftIcon"/>}
        <input
            type="number"
            value={page}
            onChange={handleInputChange}
        />

        {page < 5 && <KeyboardArrowRightIcon onClick={handlePagePlusOne} fontSize={"large"} className="rightIcon"/>}

    </div>
        <span className="showPage">{page}/5</span>

    </>



}