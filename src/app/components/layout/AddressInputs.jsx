import React from "react";

const AddressInputs = ({
  phone,
  setPhone,
  pincode,
  setPincode,
  city,
  setCity,
  country,
  setCountry,
  disabled = false,
}) => {
  return (
    <>
      <label>Phone No</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={(ev) => setPhone(ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          {" "}
          <label>Pin code</label>
          <input
            type="text"
            placeholder="Pin code"
            value={pincode || ""}
            disabled={disabled}
            onChange={(ev) => setPincode(ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city || ""}
            disabled={disabled}
            onChange={(ev) => setCity(ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country || ""}
        disabled={disabled}
        onChange={(ev) => setCountry(ev.target.value)}
      />
    </>
  );
};

export default AddressInputs;
