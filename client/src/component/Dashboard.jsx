import React, { useState, useRef, useEffect } from "react";
import { movies } from "./data";
import { slots } from "./data";
import { seats } from "./data";
import logo from "../img/logo.png";

//Dashboard of book my show
const Dasboard = () => {
  const [movie, setMovie] = useState();
  const [slot, setSlot] = useState();
  const [seat, setSeat] = useState();
  const [selectedSeats, setSelectedSeats] = useState({});
  const fileInputRef = useRef({});
  const [bookingDetails, setBookingdetails] = useState()
  const [shouldFetchDetails, setShouldFetchDetails] = useState(true);
  const [changeColorMovie, setChangecolor] = useState()
  const [changeColorSlot, setChangesolt] = useState()

  useEffect(() => {
    if(shouldFetchDetails){
    const fetchBookinkDeatils = async () => {
      try {
        const bookingDetails = await fetch('https://bookmyshowalmabetter-58gr.onrender.com/booking')
        const movieDeatils = await bookingDetails.json()
        setBookingdetails(movieDeatils.data)
        // if (!bookingDetails.ok) {
        //   throw new Error('Network response was not ok')
        // }
      } catch (e) {
        window.alert(e)
      }

    }

    fetchBookinkDeatils()
    setShouldFetchDetails(false)
  }
  }, [shouldFetchDetails])

  const bookMovie = async (e) => {
    if (!movie || !slot || !Object.keys(selectedSeats).length) {
      window.alert("Invalid data: All fields are required");
      return;
    }

    try {
      const res = await fetch("https://bookmyshowalmabetter-58gr.onrender.com/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
          slot,
          seats: selectedSeats
        }),
      });
      const data = await res.json();

      if (res.ok) {
        window.alert("Booking successful");
        // Optionally, reset form fields
        setMovie("");
        setSlot("");
        setSelectedSeats({});
        Object.keys(fileInputRef.current).forEach((key) => {
          if (fileInputRef.current[key]) {
            fileInputRef.current[key].value = '';
          }
        });
        setShouldFetchDetails(true);
        setChangecolor(null)
        setChangesolt(null)
      } else {
        window.alert("Error booking movie: " + data.message);
      }
    } catch (e) {
      window.alert("An error occurred while booking the movie");
    }
  };

  const handleSeatSelection = (seatName, seatValue) => {
    setSelectedSeats({ ...selectedSeats, [seatName]: seatValue });

  };
  return (
    <>
      <div className="container mx-auto">
        <img src={logo} alt="" width={170} />
        <div className="maincontainer flex justify-evenly">
          <div className="leftcontainer w-3/4">
            <div className="moviesSection border border-black p-5 rounded-md my-3">
              <h3 className="text-2xl font-bold">Select Movie</h3>
              {movies.map((movie) => {
                return (
                  <>
                    <button
                      onClick={(e) => {setMovie(e.target.value); setChangecolor(movie)}}
                      className={`px-4 py-3 border border-black m-3 ${changeColorMovie === movie ? "bg-red-500" : "hover:bg-red-500"} hover:bg-red-500 hover:text-white rounded-lg font-semibold`}
                      value={movie}
                    >
                      {movie}
                    </button>
                  </>
                );
              })}
            </div>
            <div className="TimeSection border border-black p-5 rounded-md my-3">
              <h3 className="text-2xl font-bold">Select Time Slot</h3>
              {slots.map((slot) => {
                return (
                  <>
                    <button
                      onClick={(e) => {setSlot(e.target.value); setChangesolt(slot)}}
                      className={`px-4 py-3 border border-black m-3 ${changeColorSlot === slot ? "bg-red-500" : "hover:bg-red-500"} rounded-lg hover:text-white font-semibold`}
                      value={slot}
                    >
                      {slot}
                    </button>
                  </>
                );
              })}
            </div>
            <div className="TimeSection border border-black p-5 rounded-md my-3">
              <h3 className="text-2xl font-bold">Select Seat</h3>
              <div className="flex">
                {seats.map((seat) => {
                  const seatName = seat;
                  return (
                    <>
                      <div className="p-1 border border-black m-3 hover:bg-red-500 rounded-lg hover:text-white font-medium">
                        {seatName}
                        <input
                          onChange={(e) =>
                            handleSeatSelection(seatName, e.target.value)
                          }
                          ref={(el) => (fileInputRef.current[seatName] = el)}
                          className="appearance-none border border-black rounded w-14 flex text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          min="1"
                          required
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <button
              onClick={bookMovie}
              className=" bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-400"
            >
              Submit
            </button>
          </div>
          <div className="rightcontainer w-3/12">
            <div className="border border-black p-5 rounded-md m-3">
              <h3 className="text-2xl font-bold mb-2">Last Booking Details:</h3>

              {bookingDetails ? (
                <div className="bookingDetails">
                  <div className="font-semibold">Seats:</div>
                  <div>
                    {Object.keys(bookingDetails.seats).map((seat) => (
                      <div key={seat}>{`${seat}: ${bookingDetails.seats[seat]}`}</div>
                    ))}
                  </div>
                  <div className="font-semibold">Slot: {bookingDetails.slot}</div>
                  <div className="font-semibold">Movie: {bookingDetails.movie}</div>
                </div>
              ) : (               
                  <h2 className="text-xl font-semibold bg-red-500 p-3 rounded-lg text-white text-center">No previous booking found</h2>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dasboard;
