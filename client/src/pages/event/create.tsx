/* eslint-disable @next/next/no-img-element */
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format as dateFormat } from "date-fns";
import { ArrowLeft, CalendarCheck, Image } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import FailedEvent from "@/components/ui/failed-event";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel as RootFormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LocationInput } from "@/components/ui/location-input";
import PageCard from "@/components/ui/page-card";
import { SelectBranch } from "@/components/ui/select-branch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEvent } from "@/hooks/queries/event";
import { updateDateWithTime } from "@/lib/utils";
import { schema } from "@/types/event";

export default function CreateEvent() {
  const router = useRouter();
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const { mutate: createEvent, isPending } = useCreateEvent({
    onSuccess: (event) => {
      router.push(`/event/${event.id}`);
      toast.success("Event has been created.");
    },
    onError: () => {
      setFailedMessage("Unable to create event. Please try again later.");
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      coordinates: null,
      payment_link: "",
      branch_id: NaN,
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile],
  );

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
  }

  function onSubmit(values: z.infer<typeof schema>) {
    createEvent({
      title: values.title,
      description: values.description,
      branch_id: values.branch_id,
      start_time: values.start_date.toISOString(),
      end_time: values.end_date.toISOString(),
      location: values.location,
      coordinates: values.coordinates ?? undefined,
      payment_link: values.payment_link,
      image: imageFile || undefined,
    });
  }

  return (
    <PageCard>
      <div className="flex justify-between border-b-2 border-[#7D916F] p-1">
        <h1 className="text-lg font-semibold">Create new Event</h1>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Primary Inputs */}
        <Form {...form}>
          <form
            id="edit_event_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>Title</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 bg-[#EFF1ED] placeholder-black"
                        placeholder="Day Hike and Barbecue"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>Description</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-40 bg-[#EFF1ED] placeholder-black focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[#7D916F]"
                        placeholder="A day hike around the waterfall, followed by a barbecue."
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch_id"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>Branch</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <SelectBranch
                        selectedId={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>Start Date and Time</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <div className="flex flex-col gap-1 sm:flex-row">
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                          className="w-full flex-1 sm:w-auto"
                        />
                        <Input
                          type="time"
                          value={
                            field.value ? dateFormat(field.value, "HH:mm") : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              updateDateWithTime(
                                field.value || new Date(),
                                e.target.value || "12:00",
                              ),
                            )
                          }
                          className="flex-1 bg-[#EFF1ED]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>End Date and Time</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <div className="flex flex-col gap-1 sm:flex-row">
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                          className="w-full flex-1 sm:w-auto"
                        />
                        <Input
                          type="time"
                          value={
                            field.value ? dateFormat(field.value, "HH:mm") : ""
                          }
                          onChange={(e) => {
                            field.onChange(
                              updateDateWithTime(
                                field.value || new Date(),
                                e.target.value || "12:00",
                              ),
                            );
                          }}
                          className="flex-1 bg-[#EFF1ED]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel required>Location Name</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 bg-[#EFF1ED] placeholder-black"
                        placeholder="MacKenzie Falls Car Park, Grampians National Park"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel>Map Location</FormLabel>
                  <FormControl>
                    <LocationInput
                      value={field.value}
                      onChange={field.onChange}
                      className="md:w-[65%]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_link"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-1.5 space-y-0 md:flex-row">
                  <FormLabel>Payment Link</FormLabel>
                  <div className="flex flex-col gap-1 md:w-[65%]">
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 bg-[#EFF1ED] placeholder-black invalid:border-red-500"
                        placeholder="Link to external payment page"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Image Upload */}
        <div className="flex flex-col gap-5">
          <div className="flex min-h-[325px] flex-1 flex-col gap-3 rounded-lg border-2 border-[#7D916F] p-5">
            <label
              htmlFor="imageInput"
              className="flex items-center gap-2 text-lg"
            >
              Upload Image <Image />
            </label>

            <input
              id="imageInput"
              type="file"
              onChange={onImageChange}
              className="block w-full text-sm text-slate-500 file:ml-0 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#7D916F] hover:cursor-pointer hover:file:bg-violet-100"
              accept="image/jpeg, image/png, image/jpg, image/gif"
            />

            <div className="flex flex-1 items-center justify-center">
              {imageUrl && <img src={imageUrl} alt="Event Image" />}
            </div>
          </div>

          <Button
            variant="outline"
            type="submit"
            form="edit_event_form"
            className="inline-flex w-40 items-center gap-2 self-end border-[1.5px] border-[#7D916F] text-black"
          >
            {isPending ? (
              <ReloadIcon className="size-4 animate-spin text-primary" />
            ) : (
              <>
                Create Event
                <CalendarCheck className="text-[#7D916F]" />
              </>
            )}
          </Button>
        </div>
      </div>
      <FailedEvent
        message={failedMessage}
        onClose={() => {
          setFailedMessage(null);
        }}
      />
    </PageCard>
  );
}

function FormLabel({
  children,
  required = false,
}: {
  children: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <RootFormLabel className="text-base font-normal">
        {children}
        {required && <span className="text-red-500"> *</span>}
      </RootFormLabel>
    </div>
  );
}
