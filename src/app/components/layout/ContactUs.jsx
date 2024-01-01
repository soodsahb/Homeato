import React from "react";
import SectionHeaders from "./SectionHeaders";
import { IoCall } from "react-icons/io5";
const ContactUs = () => {
  return (
    <section id="contactus" className="text-center flex flex-col items-center ">
      <SectionHeaders
        subHeader={"Don't hestitate"}
        mainHeader={"Contact Us"}
      ></SectionHeaders>
      <IoCall className="text-2xl" />
      <a
        href="tel:+911234567890"
        className="text-2xl mt-2 underline text-gray-500"
      >
        +911234567890
      </a>
    </section>
  );
};

export default ContactUs;
