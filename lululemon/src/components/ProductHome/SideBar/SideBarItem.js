import RemoveIcon from '@mui/icons-material/Remove';
import "./SideBarItem.scss"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {ViewIcon} from "./ViewIcon";
import {useState} from "react";
export const SideBarItem = ({item}) => {
    const [checked, updateChecked] = useState(false)
    const name = item[0]
    const filterList = item[1]
    const onClickChecked = () => {
        updateChecked(prevState => !prevState)}
    return <div className="sideBarItem">
        <div className="itemExpand">
            <div className="itemHead">
                <span className="filterTitle">{name}</span>
                <RemoveIcon/>
            </div>
            <div className="itemBody">
                <ul className="itemList">
                    {filterList.map(({name},index)=>
                    index<= 4 && <li key={index}>
                        <CheckBoxOutlineBlankIcon className="icon"/>
                            <span className="itemName">{name}</span>
                    </li>
                    )}
                    {filterList.map(({name},index)=>
                            index> 4 && checked && <li key={index}>
                                <CheckBoxOutlineBlankIcon className="icon"/>
                                <span className="itemName">{name}</span>
                            </li>)}
                </ul>
                {filterList.length > 5 && <div className="viewMore" onClick={onClickChecked}>
                    <span>View More</span>
                    <ViewIcon class="view" checked={checked}/>
                </div>}


            </div>
        </div>



    </div>
}