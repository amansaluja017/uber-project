import React from 'react'

function LocationSearchPanel({suggestions, setVehiclePanel, setOpenPanel, setStart, setEnd, activeField}) {
  const handleSuggestionsClick = (suggestion) => {
    if(activeField === 'start') {
        setStart(suggestion);
    } else if (activeField === 'end') {
        setEnd(suggestion);
    }
  }

  return (

    <>
    {suggestions.map((suggestion, index) => {
        return (
            <div key={index} onClick={() => handleSuggestionsClick(suggestion)} className='mt-5'>
                <div className='flex gap-2 rounded py-2 outline-2'>
                    <h2><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{suggestion.name}</h4>
                </div>
            </div>
        )
    })}
    </>
  )
}

export default LocationSearchPanel