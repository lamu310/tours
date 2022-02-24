import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    //console.log(tours);
  };

  const removeTour = (id) => {
    let newTours = tours.filter((tour) => {
      return tour.id != id;
    });

    setTours(newTours);
  };

  const refresh = () => {
    setLoading(true);
    getTours();
  };

  useEffect(() => {
    getTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading></Loading>
      </main>
    );
  }

  if (tours.length == 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <div className="underline"></div>

          <button className="btn" onClick={() => refresh()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  );
}

export default App;
