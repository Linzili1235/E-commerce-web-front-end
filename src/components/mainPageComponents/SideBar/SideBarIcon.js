import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useSelector} from "react-redux";
import actions from "../../../actions";
import {useDispatch} from "react-redux";

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


const CheckedBoxIcon = ({checked}) => {
    const dispatch = useDispatch()
    // console.log('[val]', val);
    // const allFilters = useSelector(state => state?.productReducer?.filters)
    // // allFilters = {}
    //
    // const entries = Object.entries(checked);
    // //key: index, value: {name:..., isChecked:...}
    // // console.log('entries', entries)
    //
    // // entry is value.name, which is the name of the filter
    // const handlerCheckBoxChange = (entry) => {
    //     // console.log('entry in handler', entry)
    //     actions?.filterActions?.updateFilter(dispatch)(entry)
    //         .then( rs => {
    //             rs && actions?.productActions?.fetchAllProductsWithFilter(dispatch)(allFilters)
    //         })
    // }
    let filters = useSelector(state => state?.productReducer?.filters)
    let isCheckedInside = false
    filters = Object.entries(filters)
    filters.map(([bigName,filterObject]) => {
        filterObject.map(item => {
            const {name,isChecked} = item
            if (name === checked) {
                isCheckedInside = isChecked
            }
        })

    })

    return <div className="checkedBoxIcon" >
        {isCheckedInside ? <CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}
    </div>
}

export {ItemCheckedIcon,TitleCheckedIcon,CheckedBoxIcon}