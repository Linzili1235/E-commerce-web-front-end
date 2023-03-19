import React from 'react';
import './AddToBagSummary.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../../../Helper";


const AddToBagSummary = () => {
    const dispatch = useDispatch()
    const { isClosed } = useSelector(state => state?.productReducer)

    const handleClose = () => {
        dispatch({
            type: actionType.TOGGLE_SUMMARY_BOX,
            payload: {isClosed: true}
        })
    }
    return (
        <>
            <div className={ isClosed ? 'hidden-summary-box' : 'summary-container' }>
                <div className="summary-container-background"></div>
                <div className="summary-box">
                    <div className="summary-content">
                        <div className="summary-header">
                            <div className="summary-title">
                                Added To Your Bag
                            </div>
                            <div className="shopping-bag">
                            {/*  Todo */}
                            </div>
                        </div>
                        <div className="close-button">
                            <CloseOutlinedIcon fontSize={'large'} onClick={handleClose}/>
                        </div>
                        <div className="breakLine"></div>
                        <div className="notification">
                            <p>Items are not reserved. Checkout now to get your gear.</p>
                        </div>

                        <div className="product-summary">

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddToBagSummary;