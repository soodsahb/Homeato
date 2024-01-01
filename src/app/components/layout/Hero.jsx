import Image from "next/image";
import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero mt-2 md:mt-4">
      <div className="py-8 md:py-12 text-left">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better <br /> with a{" "}
          <span className="text-primary ">Pizza</span>
        </h1>

        <p className="my-6 text-gray-500 font-semibold">
          Life is better with a slice of pizza order now
        </p>
        <div className="flex gap-4 items-center ">
          <Link href={"/menu"} className="block">
            <button className="text-white uppercase bg-primary rounded-full px-4 py-4 flex items-center gap-2 justify-center">
              <span>Order Now</span>
              <FaRegArrowAltCircleRight />
            </button>
          </Link>

          <Link href={"/#about"} className="block">
            <button className="flex gap-2 text-gray-500 px-4 py-4 items-center bg-slate-100 rounded-full justify-center">
              <span>Learn More</span>
              <FaRegArrowAltCircleRight />
            </button>
          </Link>
        </div>
      </div>

      <div className=" relative hidden md:block ">
        <Image
          src={"/pizza.png"}
          layout="fill"
          objectFit="contain"
          alt="image"
        ></Image>
      </div>
    </section>
  );
};

export default Hero;
