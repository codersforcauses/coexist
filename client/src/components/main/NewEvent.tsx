import { CalendarCheck, Image, X } from "lucide-react";

import addEvent from "../../hooks/addEvent";

export default function NewEvent() {
  return (
    <div className="my-8 min-h-[500px] w-[85vw] rounded-[13px] border-2 border-[#000] p-5">
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold"> Create Event </h1>

        <a href="">
          <X />
        </a>
      </div>

      <div className="grid-col-1 my-4 grid h-full text-center lg:grid-cols-2">
        <div className="mx-auto h-full w-4/5 lg:w-full">
          <form className="flex flex-col">
            <div className="flex justify-between px-1 py-3">
              <label>Title</label>
              <input
                type="text"
                className="rounded border-2 bg-[#EFF1ED] px-1 placeholder-black"
                placeholder="Enter text"
              ></input>
            </div>

            <div className="flex justify-between px-1 py-3 text-start">
              <label>Description</label>
              <input
                type="text"
                className="rounded border-2 bg-[#EFF1ED] px-1 py-10 placeholder-black"
                placeholder="Enter text"
              ></input>
            </div>

            <div className="flex justify-between px-1 py-3">
              <label>City</label>
              <select className="rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
                <option value="">Select</option>
                <option value="city1">Perth</option>
                <option value="city2">Syndney</option>
                <option value="city3">Canberra</option>
              </select>
            </div>

            <div className="flex justify-between px-1 py-3">
              <label>Location</label>
              <input
                type="text"
                className="rounded border-2 bg-[#EFF1ED] px-1 placeholder-black"
                placeholder="Enter text"
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
              onClick={addEvent}
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
