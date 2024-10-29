import { ArrowLeft, CalendarCheck, Image } from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import PageCard from "@/components/ui/page-card";

import addEvent from "../../../hooks/addEvent";
import { CalenderPickerEnd } from "../../ui/calendar-pick-end";
import { CalenderPickerStart } from "../../ui/calendar-pick-start";
import FailedEvent from "../../ui/failed-event";
import { Input } from "../../ui/input";
import LoadingEvent from "../../ui/loadingevent";
import { SelectBranch } from "../../ui/select-branch";
import SuccessEvent from "../../ui/success-event";
import { Textarea } from "../../ui/textarea";

const validURL = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

export default function NewEvent() {
  const topElement = useRef<HTMLDivElement>(null);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [paymenturl, setPaymenturl] = useState("");
  let [location, setLocation] = useState("");
  let [locationUrl, setLocationUrl] = useState("");
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
      selectedEndDate === null ||
      validURL(locationUrl) == false
    ) {
      topElement.current?.scrollIntoView({
        behavior: "smooth",
      });
      setfill(true);
      return;
    } else {
      setfill(false);
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
    formData.append("branch_id", city);

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
    <PageCard ref={topElement}>
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold"> Create Event </h1>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Primary Inputs */}
        <div>
          <form className="flex flex-col gap-5">
            <p className={`${fill ? "block italic" : "hidden"} text-red-500`}>
              Please fill out all required fields (*).
            </p>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Title <a className="text-red-500">*</a>{" "}
              </label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#EFF1ED] placeholder-black md:w-[65%]"
                placeholder="Day Hike and Barbecue"
                disabled={isLoading}
              ></Input>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Description <a className="text-red-500">*</a>
              </label>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A day hike around the waterfall, followed by a barbecue."
                className="h-40 bg-[#EFF1ED] placeholder-black focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[#7D916F] md:w-[65%]"
                disabled={isLoading}
              ></Textarea>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Branch <a className="text-red-500">*</a>
              </label>
              <SelectBranch setValue={setCity} signUp={false} />
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Start Date and Time <a className="text-red-500">*</a>
              </label>
              <div className="flex flex-col gap-1 sm:flex-row md:w-[65%]">
                <CalenderPickerStart
                  setStartSelectedDate={setStartSelectedDate}
                  className="w-full flex-1 sm:w-auto"
                />
                <Input
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                  className="flex-1 bg-[#EFF1ED]"
                  disabled={isLoading}
                ></Input>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                End Date and Time <a className="text-red-500">*</a>
              </label>
              <div className="flex flex-col gap-1 sm:flex-row md:w-[65%]">
                <CalenderPickerEnd
                  setEndSelectedDate={setEndSelectedDate}
                  className="w-full flex-1 sm:w-auto"
                />
                <Input
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  className="flex-1 bg-[#EFF1ED]"
                  disabled={isLoading}
                ></Input>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Location Name <a className="text-red-500">*</a>
              </label>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                className="bg-[#EFF1ED] placeholder-black md:w-[65%]"
                placeholder="MacKenzie Falls Car Park, Grampians National Park"
                disabled={isLoading}
              ></Input>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>
                Location Link <a className="text-red-500">*</a>
              </label>
              <Input
                onChange={(e) => setLocationUrl(e.target.value)}
                className={`bg-[#EFF1ED] placeholder-black md:w-[65%] ${
                  locationUrl.length > 0 && !validURL(locationUrl)
                    ? "border-red-500 bg-red-100"
                    : ""
                }`}
                placeholder="https://maps.app.goo.gl/bS2GdrLSVqz7skDC9"
                disabled={isLoading}
              ></Input>
            </div>

            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <label>Payment Link</label>
              <Input
                onChange={(e) => setPaymenturl(e.target.value)}
                className="bg-[#EFF1ED] placeholder-black md:w-[65%]"
                placeholder="Link to external payment page"
                disabled={isLoading}
              ></Input>
            </div>
          </form>
          <SuccessEvent success={success}></SuccessEvent>
          <FailedEvent failed={failed} setFailed={setFailed}></FailedEvent>
          <LoadingEvent loading={isLoading}></LoadingEvent>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-5">
          <div className="min-h-[325px] flex-1 rounded-[10px] border-2 border-[#7D916F] p-5 text-start">
            <h1 className="flex items-center gap-2 text-lg">
              Upload Image <Image />
            </h1>

            <form encType="multipart/form-data" className="my-2">
              <div className="flex items-center">
                <div className="shrink-0"></div>
                <label className="block">
                  <span className="sr-only">Choose</span>
                  <input
                    type="file"
                    onChange={loadFile}
                    className="block w-full text-sm text-slate-500 file:ml-0 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#7D916F] hover:cursor-pointer hover:file:bg-violet-100"
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

          <Button
            variant="outline"
            onClick={() => formSubmit()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 self-end border-[1.5px] border-[#7D916F] text-black"
          >
            Add Event <CalendarCheck className="text-[#7D916F]" />
          </Button>
        </div>
      </div>
    </PageCard>
  );
}
