import "./SideBarItem.scss"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {TitleCheckedIcon,ItemCheckedIcon} from "./SideBarIcon";
import {useState} from "react";
export const SideBarItem = ({item}) => {
    const [itemChecked, updateItemChecked] = useState(false)
    const [titleChecked, updateTitleChecked] = useState(true)
    const name = item[0]
    const filterList = item[1]
    const onClickItemChecked = () => {
        updateItemChecked(prevState => !prevState)}

    const onClickTitleChecked = () => {
        updateTitleChecked(prevState => !prevState)
    }
    return <div className="sideBarItem">
        <div className="itemExpand">
            <div className="itemHead" onClick={onClickTitleChecked}>
                <span className="filterTitle">{name}</span>
                <TitleCheckedIcon checked={titleChecked} />
            </div>
            {titleChecked && <div className="itemBody">
                <ul className="itemList">
                    {filterList.map(({name},index)=>
                    index<= 4 && <li key={index}>
                        <CheckBoxOutlineBlankIcon className="icon"/>
                            <span className="itemName">{name}</span>
                    </li>
                    )}
                    {filterList.map(({name},index)=>
                            index> 4 && itemChecked && <li key={index}>
                                <CheckBoxOutlineBlankIcon className="icon"/>
                                <span className="itemName">{name}</span>
                            </li>)}
                </ul>
                {filterList.length > 5 && <div className="viewMore" onClick={onClickItemChecked}>
                    <span className="viewMoreTitle">View More</span>
                    <ItemCheckedIcon checked={itemChecked}/>
                </div>}


            </div>}
        </div>



    </div>
}