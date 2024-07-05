import { CalendarCheck, CalendarDays, Image, X } from "lucide-react";
import next from "next";
import Link from "next/link";
import React, { useRef, useState } from "react";

import addEvent from "../../hooks/addEvent";
import { CalenderPicker } from "../ui/calenderpick";
import FailedEvent from "../ui/failedevent";
import SuccessEvent from "../ui/successevent";

export default function NewEvent() {
  let title = useRef<HTMLInputElement>(null);

  let description = useRef<HTMLTextAreaElement>(null);
  let paymenturl = useRef<HTMLInputElement>(null);
  let location = useRef<HTMLInputElement>(null);
  let city = useRef<HTMLSelectElement>(null);
  let time = useRef<HTMLInputElement>(null);
  let imageInput = useRef<HTMLInputElement>(null);

  let [fill, setfill] = useState(false);

  let [selectedDate, setSelectedDate] = useState<Date>();
  let [success, setSuccess] = useState(false);
  let [failed, setFailed] = useState(false);
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
      document.getElementById("top")?.scrollIntoView({
        behavior: "smooth",
      });

      setfill(true);

      return;
    } else {
      setfill(false);
    }

    let data_time = `${data.date}T${data.time}:00Z`;
    let formData: any = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("date_time", data_time);
    if (data.paymenturl) {
      formData.append("payment_link", data.paymenturl);
    }
    if (imageInput.current?.files?.[0]) {
      formData.append("image", imageInput.current?.files?.[0]);
    }

    test(formData);
  }

  async function test(s: any) {
    if (await addEvent(s)) {
      setSuccess(true);
    } else {
      setFailed(true);
    }
  }

  const loadFile = function (event: any) {
    const input = event.target;
    const file = input.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const output: HTMLDivElement | null = document.getElementById(
        "preview_img",
      ) as HTMLDivElement;

      if (output) {
        output.style.backgroundImage = `url(${imageUrl})`;

        output.onload = function () {
          URL.revokeObjectURL(imageUrl);
        };
      }
    }
  };

  return (
    <div
      id="top"
      className="my-8 min-h-[500px] w-[95%] rounded-[13px] border-2 border-[#000] p-5"
    >
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold"> Create Event </h1>

        <Link href="/">
          <X />
        </Link>
      </div>

      <div className="grid-col-1 my-4 grid h-full text-center lg:grid-cols-2">
        <div className="mx-auto h-full w-full">
          <form className="sm:max-w-auto mx-auto flex max-w-[80vw] flex-col text-start">
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
              <textarea
                wrap="physical"
                className="h-40 w-full rounded border-2 bg-[#EFF1ED] px-1 py-1 text-start placeholder-black md:w-[65%]"
                placeholder="Enter text"
                ref={description}
              ></textarea>
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
          <SuccessEvent success={success}></SuccessEvent>
          <FailedEvent failed={failed} setFailed={setFailed}></FailedEvent>
        </div>

        <div className="flex h-full flex-col items-center">
          <div className="mx-auto h-full min-h-[325px] w-4/5 max-w-[80vw] overflow-x-scroll rounded-[10px] border-2 border-[#7D916F] p-5 text-start sm:overflow-hidden">
            <h1 className="text-m flex">
              {" "}
              Upload Image <Image className="mx-1" />
            </h1>

            <form encType="multipart/form-data" className="my-2">
              <div className="flex items-center">
                <div className="shrink-0"></div>
                <label className="block">
                  <span className="sr-only">Choose</span>
                  <input
                    type="file"
                    onChange={() => loadFile(event)}
                    className="block w-full text-sm text-slate-500 file:ml-0 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#7D916F] hover:file:bg-violet-100"
                    ref={imageInput}
                    accept="image"
                  />
                </label>
              </div>
            </form>
            <div
              id="preview_img"
              className="m-4 mx-auto h-[300px] w-[300px] border-none bg-cover bg-no-repeat object-cover"
            />
          </div>
          <div className="my-auto mt-5 w-full px-5 text-end">
            <button
              className="rounded-[13px] border-2 border-[#181818] p-1 px-2 hover:bg-slate-200 hover:opacity-80"
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
