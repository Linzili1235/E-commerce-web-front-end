import React, { useState, useEffect } from "react";
import './CurrentCity.scss';

const CurrentCity = () => {
    const [locationData, setLocationData] = useState({
        city: null,
        postalCode: null,
    });
    const [error, setError] = useState(null);

    // Grab geolocation data when start the page
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getCityAndPostalCode(position.coords.latitude, position.coords.longitude).then();
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

    return (
        <>
            {error ? (
                <>Error: {error}</>
            ) : (
                <>
                    {
                        <span className='postcode'>
                        {locationData.city ? locationData.city : "Loading..."}{' '}
                            {locationData.postalCode ? locationData.postalCode : "Loading..."}
                    </span>
                    }
                </>
            )}
        </>
    );
};

export default CurrentCity;
