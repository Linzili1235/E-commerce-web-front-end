import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export const ViewIcon = ({checked}) => {
    return <div className="viewIcon" >
        {checked ? <RemoveIcon/>: <AddIcon/>}
    </div>
}