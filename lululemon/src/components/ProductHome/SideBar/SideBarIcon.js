import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const ItemCheckedIcon = ({checked}) => {
    return <div className="itemCheckedIcon" >
        {checked ? <RemoveIcon/>: <AddIcon/>}
    </div>
}

const TitleCheckedIcon = ({checked}) => {
    return <div className="titleCheckedIcon">
        {checked ? <RemoveIcon/>:<AddIcon/>}
    </div>
}

export {ItemCheckedIcon,TitleCheckedIcon}