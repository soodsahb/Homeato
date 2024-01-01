import React from "react";
import SectionHeaders from "./SectionHeaders";
const AboutUs = () => {
  return (
    <section id="about" className="my-16 ">
      <SectionHeaders
        subHeader={"Our Story"}
        mainHeader={"About Us"}
      ></SectionHeaders>
      <div className="mx-auto max-w-md mt-4 text-gray-500 flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          magni deleniti earum ex placeat rem, inventore numquam dolore illum
          tenetur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          magni deleniti earum ex placeat rem, inventore numquam dolore illum
          tenetur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          magni deleniti earum ex placeat rem, inventore numquam dolore illum
          tenetur.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
