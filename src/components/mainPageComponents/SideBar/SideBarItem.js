import "./SideBarItem.scss"
import {TitleCheckedIcon,ItemCheckedIcon,CheckedBoxIcon} from "./SideBarIcon";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
export const SideBarItem = ({item}) => {
    const dispatch = useDispatch()

    const [itemChecked, updateItemChecked] = useState(false)
    const [titleChecked, updateTitleChecked] = useState(true)
    // Problem: simple true State will lead to change to all filters in one sideBarItem
    // create a list of false which corresponds to the specific filter
    const name = item[0]
    const filterList = item[1]
    const allFilters = useSelector(state => state?.productReducer?.filters)
    const onClickItemChecked = () => {
        updateItemChecked(prevState => !prevState)}

    const onClickTitleChecked = () => {
        updateTitleChecked(prevState => !prevState)
    }
    // Grab url params and use them to dispatch actions
    const urlParams = useSelector(state => state?.productReducer?.params)
    const page = urlParams.pageNum;
    const sortingId = urlParams.sortingId;

    // name is an entry here
    const onClickFilterChecked = (name, page, sortingId) => {
        actions.filterActions.updateFilter(dispatch)(name)
            .then( rs => {
                rs && actions.productActions.fetchAllProductsWithFilter(dispatch, page, sortingId)(allFilters)
            })
    }
    return <div className="sideBarItem">
        <div className="itemExpand">
            <div className="itemHead" onClick={onClickTitleChecked}>
                <span className="filterTitle">{name}</span>
                <TitleCheckedIcon checked={titleChecked} />
            </div>
            {/*Special design for filter Color*/}
            {name === "Colour"? titleChecked &&
                <ul className="colorList">
                    {filterList.map((swatchObject,index) => {
                return <li className="swatch-filter" key={index}>
                    <img src={swatchObject.swatch} alt={swatchObject.alt}/>
                    <span className="swatchAlt">
                        {swatchObject.alt}
                    </span>
                </li>
            })} </ul>:

                // for other filters

                <div className={`itemBody ${titleChecked? "showTitle": ""}`}>
                <ul className="itemList">
                    {filterList.map(({name},index)=>
                    index<= 4 && <li key={index}
                                     onClick={()=>{ onClickFilterChecked(name, page, sortingId)}} >
                        <CheckedBoxIcon  checked={name} />
                        <div className="filterName">
                            <span>{name}</span>
                        </div>
                    </li>
                    )}
                </ul>


                    <ul className= {`itemList_expanded ${itemChecked? "show": ""}`}>
                    {filterList.map(({name, isChecked},index)=>
                            index> 4 && <li key={index} onClick={() => onClickFilterChecked(name, page, sortingId)}>
                            <CheckedBoxIcon checked={name} />
                                <div className="filterName"><span className="itemName">{name}</span></div>
                            </li>)}
                    </ul>
                    {filterList.length > 5 && <div className={`viewMore ${titleChecked?"":"showView"}`} onClick={onClickItemChecked}>
                        <span className="viewMoreTitle">View More</span>
                        <ItemCheckedIcon checked={itemChecked}/>
                    </div>}

            </div>

            }






            </div>



    </div>
}