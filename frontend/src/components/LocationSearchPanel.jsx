import React, { useState, useRef } from "react";

function LocationSearchPanel({ suggestions, setStart, setEnd, activeField }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSuggestionsClick = (suggestion) => {
    if (activeField === "start") {
      setStart(suggestion);
    } else if (activeField === "end") {
      setEnd(suggestion);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!inputRef.length === 0) {
    setLoading(true);
  }

  return (
    <>
      {suggestions.map((suggestion, index) => {
        return (
          <div
            ref={inputRef}
            key={index}
            onClick={() => handleSuggestionsClick(suggestion)}
            className="mt-5"
          >
            <div className="flex gap-2 rounded py-2 bg-[#F5F5F5]">
              <h2>
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className="font-medium">{suggestion.name}</h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default LocationSearchPanel;
