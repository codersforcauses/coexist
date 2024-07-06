import { CalendarCheck, CalendarDays, Image, X } from "lucide-react";
import next from "next";
import Link from "next/link";
import React, { useRef, useState } from "react";

import addEvent from "../../hooks/addEvent";
import { CalenderPicker } from "../ui/calender-pick";
import FailedEvent from "../ui/failed-event";
import SuccessEvent from "../ui/success-event";

export default function NewEvent() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [paymenturl, setPaymenturl] = useState("");
  let [location, setLocation] = useState("");
  let [city, setCity] = useState("");
  let [time, setTime] = useState("");
  let imageInput = useRef<HTMLInputElement>(null);

  let [fill, setfill] = useState(false);
  let [selectedDate, setSelectedDate] = useState<Date>();
  let [success, setSuccess] = useState(false);
  let [failed, setFailed] = useState(false);
  let imagePreview = useRef<HTMLDivElement>(null);

  function formSubmit() {
    if (
      title === "" ||
      description === "" ||
      location === "" ||
      city === "" ||
      time === "" ||
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

    let data_time = `${selectedDate}T${time}:00Z`;
    let formData: any = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date_time", data_time);

    if (paymenturl) {
      formData.append("payment_link", paymenturl);
    }

    if (imageInput.current?.files?.[0]) {
      formData.append("image", imageInput.current?.files?.[0]);
    }

    apiCall(formData);
  }

  async function apiCall(data: FormData) {
    if (await addEvent(data)) {
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

      if (imagePreview.current) {
        imagePreview.current.style.backgroundImage = `url(${imageUrl})`;

        imagePreview.current.onload = function () {
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
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Description *</label>
              <textarea
                wrap="physical"
                className="h-40 w-full rounded border-2 bg-[#EFF1ED] px-1 py-1 text-start placeholder-black md:w-[65%]"
                placeholder="Enter text"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>City (Co-Exist Branch) *</label>
              <select
                onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setTime(e.target.value)}
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
                onChange={(e) => setLocation(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Payment Url</label>
              <input
                type="text"
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                onChange={(e) => setPaymenturl(e.target.value)}
              ></input>
            </div>
          </form>
          <SuccessEvent success={success}></SuccessEvent>
          <FailedEvent failed={failed} setFailed={setFailed}></FailedEvent>
        </div>

        <div className="flex h-full flex-col items-center">
          <div className="mx-auto h-full min-h-[325px] w-[90%] max-w-[90vw] overflow-x-scroll rounded-[10px] border-2 border-[#7D916F] p-5 text-start sm:w-4/5 sm:overflow-hidden">
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
                    accept="image/jpeg, image/png, image/jpg, image/gif"
                  />
                </label>
              </div>
            </form>
            <div
              ref={imagePreview}
              className="m-4 mx-auto h-[300px] w-[300px] border-none bg-cover bg-no-repeat object-cover"
            />
          </div>
          <div className="my-auto mt-5 w-full px-5 text-end">
            <button
              className="rounded-[13px] border-2 border-[#181818] p-1 px-2 hover:bg-slate-200 hover:opacity-80"
              onClick={() => formSubmit()}
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
