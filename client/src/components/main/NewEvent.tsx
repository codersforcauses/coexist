import { CalendarCheck, CalendarDays, Image, X } from "lucide-react";
import React, { useRef, useState } from "react";

import addEvent from "../../hooks/addEvent";
import { CalenderPicker } from "../ui/calenderpick";

export default function NewEvent() {
  let title = useRef<HTMLInputElement>(null);

  let description = useRef<HTMLInputElement>(null);
  let paymenturl = useRef<HTMLInputElement>(null);
  let location = useRef<HTMLInputElement>(null);
  let city = useRef<HTMLInputElement>(null);
  let time = useRef<HTMLInputElement>(null);

  let [fill, setfill] = useState(false);

  let [selectedDate, setSelectedDate] = useState<Date>();

  function getInfo() {
    let data = {
      title: title.current?.value,
      description: description.current?.value,
      location: location.current?.value,
      city: city.current?.value,
      time: time.current?.value,
      date: selectedDate,
      paymenturl: paymenturl.current?.value,
    };

    if (
      data.title === "" ||
      data.description === "" ||
      data.location === "" ||
      data.city === "" ||
      data.time === "" ||
      selectedDate === null
    ) {
      setfill(true);
      return;
    } else {
      setfill(false);
    }

    alert(JSON.stringify(data, null, 2));
    //addEvent(data);
  }

  return (
    <div className="my-8 min-h-[500px] w-[95%] rounded-[13px] border-2 border-[#000] p-5 md:w-[85vw]">
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold"> Create Event </h1>

        <a href="/">
          <X />
        </a>
      </div>

      <div className="grid-col-1 my-4 grid h-full text-center lg:grid-cols-2">
        <div className="mx-auto h-full w-full min-w-[0%]">
          <form className="flex flex-col text-start">
            <p className={`${fill ? "block italic" : "hidden"} text-red-500`}>
              Please fill out all required fields (*).
            </p>
            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Title * </label>
              <input
                type="text"
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                ref={title}
              ></input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Description *</label>
              <input
                type="text"
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 py-10 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                ref={description}
              ></input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>City (Co-Exist Branch) *</label>
              <select
                ref={city}
                className="rounded-[20px] border-2 bg-[#7D916F] p-1 px-2"
              >
                <option value="">Select</option>
                <option value="Perth">Perth</option>
                <option value="Sydney">Sydney</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Gold Coast">Gold Coast</option>
                <option value="Cairns">Cairns</option>
                <option value="Townsville">Townsville</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Hobart">Hobart</option>
                <option value="Byron Bay">Byron Bay</option>
              </select>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Date and Time *</label>
              <div className="flex w-full justify-between md:w-[65%]">
                <CalenderPicker pass={setSelectedDate} />
                <input
                  ref={time}
                  type="time"
                  className="max-w-1/2 border-2 bg-[#EFF1ED]"
                ></input>
              </div>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Location *</label>
              <input
                type="text"
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                ref={location}
              ></input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Payment Url</label>
              <input
                type="text"
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                ref={paymenturl}
              ></input>
            </div>
          </form>
        </div>

        <div className="flex h-full flex-col items-center">
          <div className="h-full min-h-[325px] w-4/5 rounded-[10px] border-2 border-[#7D916F] p-5 text-start">
            <h1 className="text-m flex">
              {" "}
              Upload Image <Image className="mx-1" />
            </h1>

            <input type="file" />
          </div>

          <div className="my-auto mt-5 w-full px-5 text-end">
            <button
              className="rounded-[13px] border-2 border-[#181818] p-1 px-2"
              onClick={() => getInfo()}
            >
              <h1 className="text-m flex">
                {" "}
                Add Event <CalendarCheck className="mx-1 text-[#7D916F]" />
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
