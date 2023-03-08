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
    console.log("item",item)
    const allFilters = useSelector(state => state?.productReducer?.filters)
    const onClickItemChecked = () => {
        updateItemChecked(prevState => !prevState)}

    const onClickTitleChecked = () => {
        updateTitleChecked(prevState => !prevState)
    }



    const onClickFilterChecked = (name) => {
        actions.filterActions.updateFilter(dispatch)(name)
            .then( rs => {
                rs && actions.productActions.fetchAllProductsWithFilter(dispatch)(allFilters)
            })
    }
    return <div className="sideBarItem">
        <div className="itemExpand">
            <div className="itemHead" onClick={onClickTitleChecked}>
                <span className="filterTitle">{name}</span>
                <TitleCheckedIcon checked={titleChecked} />
            </div>
            {/*Special design for filter Color*/}
            {name === "Colour"? filterList.map((swatchObject,index) => {
                return <div className="swatch-filter" key={index}>
                    <img src={swatchObject.swatch} alt={swatchObject.alt}/>
                    <div className="swatchAlt">
                        {swatchObject.alt}
                    </div>
                </div>
            }) :

                // for other filters

                titleChecked
             && <div className="itemBody">
                <ul className="itemList">
                    {filterList.map(({name},index)=>
                    index<= 4 && <li key={index} onClick={
                        ()=>{
                        console.log("print name outside of checkbox",name)
                        onClickFilterChecked(name)}} >
                        <CheckedBoxIcon  checked={name} />
                            <div className="filterName"><span>{name}</span></div>
                    </li>
                    )}
                    {filterList.map(({name, isChecked},index)=>
                            index> 4 && itemChecked && <li key={index} onClick={() => onClickFilterChecked(name)}>
                            <CheckedBoxIcon checked={name} />
                                <div className="filterName"><span className="itemName">{name}</span></div>
                            </li>)}
                </ul>
            </div>

            }
            {filterList.length > 5 && <div className="viewMore" onClick={onClickItemChecked}>
            <span className="viewMoreTitle">View More</span>
            <ItemCheckedIcon checked={itemChecked}/>
        </div>}





            </div>



    </div>
}