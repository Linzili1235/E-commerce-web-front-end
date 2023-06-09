import "./WhyWeMadeThis.scss"
import { useSelector } from "react-redux"

export const WhyWeMadeThis = ({color}) => {
    const productOne = useSelector(state => state?.productReducer?.one_product)
    const textOfProduct = productOne.whyWeMadeThis
    const image1 = productOne?.images[color]?.whyWeMadeThis[0]
    const image2 = productOne?.images[color]?.whyWeMadeThis[1]

    return <div className="whyWeMadeThis-wrapper">

    <div className="whyWeMadeThis-container">
            <div className="whyWeMadeThis-content">
                <h2 className="whyWeMadeThis-heading">
                    Why we
                    <br/>
                    made this
                </h2>
                <p className="whyWeMadeThis-text">
                    {textOfProduct}
                </p>

            </div>
        <div className="whyWeMadeThis-image1">
            <img src={image1} alt="image1"/>
        </div>
            <div className="whyWeMadeThis-image2">
                <img src={image2} alt="image2"/>
            </div>
        </div>

        </div>
}