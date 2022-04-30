import React, { useState, useEffect } from "react";
import Car from "./CarsTemplate";

function Cars() {
  const [cars, setCars] = useState({
    dataArray: [
      {
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
    mappedArray: [],
    show: true,
  });

  const filterCars = (e) => {
    const value = parseInt(e.target.value);
    let filteredArray = cars.dataArray.filter((obj) => obj.year === value);

    setCars((prevState) => {
      const carsData = { ...prevState };
      carsData.mappedArray = filteredArray.map((singleCar) => {
        return (
          <Car
            data={singleCar}
            key={singleCar.year + singleCar.make + singleCar.model}
          ></Car>
        );
      });
      return carsData;
    });
  };

  const mapCars = () => {
    setCars((prevState) => {
      const carsData = { ...prevState };
      carsData.mappedArray = carsData.dataArray.map((singleCar) => {
        return (
          <Car
            data={singleCar}
            key={singleCar.year + singleCar.make + singleCar.model}
          ></Car>
        );
      });
      return carsData;
    });
  };

  const carsToggleButton = () => {
    setCars((prevState) => {
      const toggle = { ...prevState };
      toggle.show = !prevState.show;
      return toggle;
    });
  };

  useEffect(() => {
    mapCars();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-3">
          <span className="p-2">
            <button className="btn btn-lg btn-info" onClick={carsToggleButton}>
              Show Cars
            </button>
          </span>
          <span className="p-2">
            <select
              name="years"
              id="years"
              onChange={filterCars}
              className="form-select-lg p-2"
            >
              <option name="2021" value="2021">
                2021
              </option>
              <option name="2020" value="2020">
                2020
              </option>
              <option name="2019" value="2019">
                2019
              </option>
            </select>
          </span>
        </div>
      </div>
      <div className="row p-2">{cars.show && cars.mappedArray}</div>
    </div>
  );
}

export default Cars;
