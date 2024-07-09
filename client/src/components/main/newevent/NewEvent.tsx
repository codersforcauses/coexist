import { ArrowLeft, CalendarCheck, CalendarDays, Image } from "lucide-react";
import next from "next";
import Link from "next/link";
import React, { useRef, useState } from "react";

import addEvent from "../../../hooks/addEvent";
import { CalenderPickerEnd } from "../../ui/calender-pick-end";
import { CalenderPickerStart } from "../../ui/calender-pick-start";
import FailedEvent from "../../ui/failed-event";
import { Input } from "../../ui/input";
import LoadingEvent from "../../ui/loadingevent";
import { Select } from "../../ui/select";
import { SelectBranch } from "../../ui/select-branch";
import SuccessEvent from "../../ui/success-event";
import { Textarea } from "../../ui/textarea";

export default function NewEvent() {
  const topElement = useRef<HTMLDivElement>(null);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [paymenturl, setPaymenturl] = useState("");
  let [location, setLocation] = useState("");
  let [city, setCity] = useState("");
  let [starttime, setStartTime] = useState("");
  let [endtime, setEndTime] = useState("");
  let imageInput = useRef<HTMLInputElement>(null);

  let [fill, setfill] = useState(false);
  let [selectedStartDate, setStartSelectedDate] = useState<Date>();
  let [selectedEndDate, setEndSelectedDate] = useState<Date>();
  let [success, setSuccess] = useState(false);
  let [failed, setFailed] = useState(false);
  let imagePreview = useRef<HTMLDivElement>(null);

  let [isLoading, setIsLoading] = useState(false);

  function formSubmit() {
    if (
      title === "" ||
      description === "" ||
      location === "" ||
      city === "" ||
      starttime === "" ||
      endtime === "" ||
      selectedStartDate === null ||
      selectedEndDate === null
    ) {
      topElement.current?.scrollIntoView({
        behavior: "smooth",
      });
      setfill(true);
      return;
    }

    setIsLoading(true);

    let start_date_time = `${selectedStartDate}T${starttime}:00Z`;
    let end_date_time = `${selectedEndDate}T${endtime}:00Z`;
    let formData: any = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("start_time", start_date_time);
    formData.append("end_time", end_date_time);
    formData.append("branch", city);

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
      setIsLoading(false);
    }
  }

  const loadFile = function () {
    const file = imageInput.current?.files?.[0] || null;

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      if (imagePreview.current) {
        imagePreview.current.style.backgroundImage = `url(${imageUrl})`;
        2;
        imagePreview.current.onload = function () {
          URL.revokeObjectURL(imageUrl);
        };
      }
    }
  };

  return (
    <div
      ref={topElement}
      className="my-8 min-h-[500px] w-[95%] rounded-[13px] border-2 border-[#000] p-5"
    >
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold"> Create Event </h1>

        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>

      <div className="grid-col-1 my-4 grid h-full text-center lg:grid-cols-2">
        <div className="mx-auto h-full w-full">
          <form className="sm:max-w-auto mx-auto flex max-w-[80vw] flex-col text-start">
            <p className={`${fill ? "block italic" : "hidden"} text-red-500`}>
              Please fill out all required fields (*).
            </p>
            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                Title <a className="text-red-500">*</a>{" "}
              </label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                disabled={isLoading}
              ></Input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                Description <a className="text-red-500">*</a>
              </label>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter text"
                className="h-40 w-full rounded border-2 bg-[#EFF1ED] px-1 py-1 text-start placeholder-black md:w-[65%]"
                disabled={isLoading}
              ></Textarea>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                City (Co-Exist Branch) <a className="text-red-500">*</a>
              </label>
              <SelectBranch setValue={setCity} setIsLoading={setIsLoading} />
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                Start Date and Time <a className="text-red-500">*</a>
              </label>
              <div className="flex w-full justify-between md:w-[65%]">
                <CalenderPickerStart
                  setStartSelectedDate={setStartSelectedDate}
                />
                <input
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                  className="max-w-1/2 border-2 bg-[#EFF1ED]"
                  disabled={isLoading}
                ></input>
              </div>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                End Date and Time <a className="text-red-500">*</a>
              </label>
              <div className="flex w-full justify-between md:w-[65%]">
                <CalenderPickerEnd setEndSelectedDate={setEndSelectedDate} />
                <input
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  className="max-w-1/2 border-2 bg-[#EFF1ED]"
                  disabled={isLoading}
                ></input>
              </div>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>
                Location <a className="text-red-500">*</a>
              </label>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                disabled={isLoading}
              ></Input>
            </div>

            <div className="flex flex-col justify-between px-1 py-3 md:flex-row">
              <label>Payment Url</label>
              <Input
                onChange={(e) => setPaymenturl(e.target.value)}
                className="w-full rounded border-2 bg-[#EFF1ED] px-1 placeholder-black md:w-[65%]"
                placeholder="Enter text"
                disabled={isLoading}
              ></Input>
            </div>
          </form>
          <SuccessEvent success={success}></SuccessEvent>
          <FailedEvent failed={failed} setFailed={setFailed}></FailedEvent>
          <LoadingEvent loading={isLoading}></LoadingEvent>
        </div>

        <div className="flex h-full flex-col items-center">
          <div className="mx-auto h-full min-h-[325px] w-[90%] max-w-[90vw] overflow-x-scroll rounded-[10px] border-2 border-[#7D916F] p-5 text-start sm:w-4/5 sm:overflow-hidden">
            <h1 className="text-m flex">
              Upload Image <Image className="mx-1" />
            </h1>

            <form encType="multipart/form-data" className="my-2">
              <div className="flex items-center">
                <div className="shrink-0"></div>
                <label className="block">
                  <span className="sr-only">Choose</span>
                  <input
                    type="file"
                    onChange={loadFile}
                    className="block w-full text-sm text-slate-500 file:ml-0 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#7D916F] hover:file:bg-violet-100"
                    ref={imageInput}
                    accept="image/jpeg, image/png, image/jpg, image/gif"
                    disabled={isLoading}
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
              disabled={isLoading}
            >
              <h1 className="text-m flex">
                Add Event <CalendarCheck className="mx-1 text-[#7D916F]" />
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
