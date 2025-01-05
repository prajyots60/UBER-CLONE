/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  const suggestions = [
    "Chembur East, Mumbai, Maharashtra, India",
    "Bandra West, Mumbai, Maharashtra, India",
    "Kurla East, Mumbai, Maharashtra, India",
    "Panvel, Navi Mumbai, Maharashtra, India",
  ];

  const handleSuggestionClick = () => {
    setPanelOpen(false);
    setVehiclePanel(true);
  };

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={handleSuggestionClick}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
