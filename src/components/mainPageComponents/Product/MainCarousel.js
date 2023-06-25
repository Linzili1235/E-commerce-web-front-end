import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const MainCarousel =({img,productId})=> {
    const navigate = useNavigate();

    // console.log('[MainCarousel] img', img)

    // handling missing or invalid props
    // if (!img) return null;
    // however, this will let useState be called conditionally, so change useState condition

    // mouse enter and leave
    // false state means mouse is not hovering
    const mouseEnterIMG = img? img?.whyWeMadeThis[0] : ''
    const mouseLeaveIMG = img? img?.whyWeMadeThis[1] : ''
    const [currentImg, setCurrentImg] = useState(mouseLeaveIMG)
    // The issue is with the MainCarousel component.
    // The img prop is not being updated properly when the selectedSwatch changes in the ProductTile component.
    // To fix this issue, add a useEffect hook in the MainCarousel component to re-render it whenever the img prop changes:
    // Whenever the value of currentImage changes, the value of the src attribute changes, causing the displayed image to change as well.
    // Cannot use currentImg as a dependency
    // currentImg is a state variable that changes over time, causing the hook to re-render continuously, leading to an infinite loop.
    //
    // When I hover on a different swatch, the {img} is updated, and setCurrentImage will update too
    useEffect(()=>setCurrentImg(mouseLeaveIMG),[img])
    const goToProduct = (id) => {
        navigate(`/singleProduct/${id}`)
    }
    return <>
    <div className="img_container">
        {
            <img className="currentIMG" src={currentImg}
                 alt={img?.mainCarousel?.alt}
                 onMouseEnter={() => setCurrentImg(mouseEnterIMG)}
                 onMouseLeave={() => setCurrentImg(mouseLeaveIMG)}
                 onClick={() => goToProduct(productId)}
                 />
        }

    </div></>
}