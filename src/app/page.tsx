"use client"
import React, { useState, useEffect, useRef } from "react";




const CityTable: React.FC = () => {
    const [cities, setCities] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [weather, setWeather] = useState<string>('');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Faild to fetch city data');
                }
                const data = await response.json();
                setCities(data.results);
                // console.log(data)
                setLoading(false);
            } catch (error) {
                setError("Error fetching city data: " + error);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);
    const apiKey = {
        key: "{}",
        base: "https://api.openweathermap.org/data/2.5/",
    }


    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <div><h1>{error}</h1></div>;
    }
    const searchPress = () => {
        fetch(`${apiKey.base}weather?q=${search}&units=metric&APPID=${apiKey.key}`).then
        ((res) => res.json())
            .then((result) => {
                console.log(result)                         
        })
    }
    return (
        <>
            <div className="container">
                <div className="row py-5">
                    <div className="col text-end">
                        <input type="text" className="py-1" placeholder="Enter city/town" onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn btn-info ms-3 mb-1" onClick={searchPress}>Search</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>City Name</th>
                                    <th>Country</th>
                                    <th>Timezone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cities.map((city: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{city.name}</td>
                                            <td>{city.cou_name_en}</td>
                                            <td>{city.timezone}</td>
                                            {/* <td><a href="" className="btn btn-info" onClick={viewWeather}>Veiw Weather</a></td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
};
export default CityTable;
