 import React, { useState } from "react";
import { Star } from "lucide-react";

export const Review = ({ AppointmentList, IsOpen, CloseReviewCard }) => {
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedRating, setSelectedRating] = useState(-1);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [comment, setComment] = useState("");

  const handleStarClick = (index) => {
    setSelectedRating(index);
  };

  const handleSubmit = () => {
    if (selectedRating === -1 || !selectedPatient) {
      alert("Please select a patient and rating before submitting");
      return;
    }

    
    console.log({
      patientId: selectedPatient,
      rating: selectedRating + 1,
      comment: comment,
    });

    setSelectedRating(-1);
    setHoveredStar(-1);
    setSelectedPatient("");
    setComment("");

    alert("Thank you for your review!");
  };

  return (
    <>
      {IsOpen && (
        <div
          className="fixed inset-0  bg-opacity-10 f z-50 backdrop-blur-sm flex justify-center items-center min-h-screen p-4"
          onClick={CloseReviewCard}
        >
          <div className="flex flex-col bg-white justify-center items-center border-2 border-green-400 gap-y-3.5 rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="bg-green-500 rounded-t-2xl w-full h-20 flex items-center justify-center">
              <h1 className="text-lg font-bold text-white text-center px-4">
                Please Leave us a review!
              </h1>
            </div>

            <div className="w-full px-6">
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full text-green-600 border-2 border-green-400 rounded-lg p-2"
              >
                <option value="">--Select A Patient--</option>
                {AppointmentList?.map((user, index) =>
                  user.status === "Completed" ? (
                    <option
                      key={user.id || index}
                      value={user.id}
                      className="text-green-800"
                    >
                      {user.patientName}
                    </option>
                  ) : null
                )}
              </select>
            </div>

            <div className="text-center px-4">
              <h1 className="font-extrabold text-xl text-green-800 pb-0.5">
                Smile For Your Dental
              </h1>
              <h1 className="font-light text-lg text-green-800">
                How was your Dental Visit?
              </h1>
            </div>

            <div className="flex flex-row gap-x-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <Star
                  key={index}
                  className={`cursor-pointer transition-colors ${
                    index <= (hoveredStar !== -1 ? hoveredStar : selectedRating)
                      ? "fill-amber-300 text-amber-300"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHoveredStar(index)}
                  onMouseLeave={() => setHoveredStar(-1)}
                  onClick={() => handleStarClick(index)}
                  size={32}
                />
              ))}
            </div>

            <div className="flex flex-col justify-center items-center gap-y-3 w-full px-6 pb-6">
              <h1 className="font-semibold text-lg">Comment</h1>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="border-2 border-green-400 w-full text-green-800 rounded-lg p-2"
                rows="5"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-400 text-black rounded-lg p-2 w-3/4 hover:bg-green-600 transition-colors font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
