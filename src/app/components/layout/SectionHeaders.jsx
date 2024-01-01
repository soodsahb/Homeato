import React from "react";

const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <div className="text-center mb-4">
      <h3 className="uppercase text-gray-500 font-semibold">{subHeader}</h3>
      <h2 className="text-4xl font-semibold italic text-primary leading-2">
        {mainHeader}
      </h2>
    </div>
  );
};

export default SectionHeaders;
