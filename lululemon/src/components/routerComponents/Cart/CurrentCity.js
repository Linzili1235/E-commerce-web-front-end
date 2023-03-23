import React, { useState, useEffect } from "react";
import './CurrentCity.scss';

const CurrentCity = () => {
    const [locationData, setLocationData] = useState({
        city: null,
        postalCode: null,
    });
    const [inputPostalCode, setInputPostalCode] = useState("");
    const [error, setError] = useState(null);

    // Grab geolocation data when start the page
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getCityAndPostalCode(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, [setLocationData]);

    const getCityAndPostalCode = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            // console.log('location', data)
            setLocationData({
                city: data.address.city || data.address.town || data.address.village,
                postalCode: data.address.postcode,
            });
        } catch (err) {
            setError("Error fetching location data");
        }
    };

    const updatePostalCode = async (postalCode) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&format=json&addressdetails=1&limit=1`
            );
            const data = await response.json();
            console.log('update data',data)
            if (data.length > 0) {
                const newLocationData = {
                    city: data[0].address.city || data[0].address.town || data[0].address.village,
                    postalCode: data[0].address.postcode,
                };
                // console.log('new data', newLocationData)
                setLocationData(newLocationData);
            } else {
                setError("Postal code not found");
            }
        } catch (err) {
            setError("Error updating location data");
        }
    };

    const handlePostalCodeChange = (e) => {
        // console.log('changed input')
        setInputPostalCode(e.target.value);
    };
    //
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     updatePostalCode(inputPostalCode)
    // };
    return (
        <>
            {error ? (
                <>Error: {error}</>
            ) : (
                <>
                    <span className='postcode'>
                        {locationData.city ? locationData.city : "Loading..."}{' '}
                        {locationData.postalCode ? locationData.postalCode : "Loading..."}
                    </span>
                </>
            )}
            <div className="form-container">
                {/*<form onSubmit={handleSubmit}>*/}
                {/*    <label htmlFor="postalCodeInput">*/}
                {/*        <div className='postcode-text'>*/}
                {/*            Postal Code:*/}
                {/*        </div>*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        id="postalCodeInput"*/}
                {/*        value={inputPostalCode}*/}
                {/*        onChange={handlePostalCodeChange}*/}
                {/*    />*/}
                {/*    <button type="submit">Update</button>*/}
                {/*</form>*/}
            </div>
        </>
    );
};

export default CurrentCity;
