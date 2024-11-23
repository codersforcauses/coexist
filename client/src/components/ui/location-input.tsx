import {
  Map,
  MapMouseEvent,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/BetterDialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Coordinates } from "@/types/map";

type LocationInputProps = {
  value: Coordinates | null;
  onChange: (coords: Coordinates | null) => void;
  className?: string;
};

export function LocationInput({
  value,
  onChange,
  className,
}: LocationInputProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row", className)}>
      <LocationPicker
        defaultCoordinates={value}
        onConfirm={(v) => {
          toast("Location has been set.");
          onChange(v);
        }}
        className="flex-1 font-semibold text-black"
      >
        {value == null ? (
          <>Choose a map location</>
        ) : (
          <>
            Change Location<span className="ml-2">📌</span>
          </>
        )}
      </LocationPicker>
      {value != null && (
        <Button type="button" variant="outline" onClick={() => onChange(null)}>
          Clear Location
        </Button>
      )}
    </div>
  );
}

type LocationPickerProps = {
  defaultCoordinates: Coordinates | null;
  onConfirm: (coords: Coordinates | null) => void;
  className?: string;
  children: ReactNode;
};

export function LocationPicker({
  defaultCoordinates,
  onConfirm,
  className,
  children,
}: LocationPickerProps) {
  const map = useMap("location-picker-map");
  const places = useMapsLibrary("places");

  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [searchValue, setSearchValue] = useState("");

  const [pinCoordinates, setPinCoordinates] = useState<Coordinates | null>(
    defaultCoordinates,
  );

  useEffect(() => {
    if (!map || !places) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const onPlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult) => {
      const location = place.geometry?.location;
      if (location) {
        setPinCoordinates({ lat: location.lat(), lon: location.lng() });
        map?.setCenter(location);
        map?.setZoom(15);
      }
    },
    [map],
  );

  const fetchPredictions = useCallback(
    async (searchValue: string) => {
      if (!autocompleteService || !searchValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: searchValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;
      setSearchValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions],
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null,
      ) => {
        if (placeDetails) onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setSearchValue("");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken],
  );

  const onDoubleClick = (ev: MapMouseEvent) => {
    const latLng = ev.detail.latLng;
    if (latLng) {
      setPinCoordinates({
        lat: latLng.lat,
        lon: latLng.lng,
      });
    }
  };

  return (
    <Dialog
      onOpenChange={(v) => {
        if (v) {
          setPinCoordinates(defaultCoordinates);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select location for event</DialogTitle>
          <DialogDescription>
            Use the search bar to find a specific place, or double-click on the
            map to manually set a location
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-1.5">
          <Popover open={predictionResults.length > 0}>
            <PopoverAnchor>
              <Input
                type="text"
                placeholder="Search for location..."
                value={searchValue}
                onInput={(ev) => onInputChange(ev)}
                className=""
              />
            </PopoverAnchor>
            <PopoverContent
              className="pointer-events-auto"
              align="start"
              onOpenAutoFocus={(ev) => ev.preventDefault()}
            >
              <Command shouldFilter={false}>
                <CommandList>
                  <CommandGroup>
                    {predictionResults.map((result) => (
                      <CommandItem
                        key={result.place_id}
                        onSelect={() => handleSuggestionClick(result.place_id)}
                      >
                        {result.description}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div
            className={`flex-1 overflow-hidden rounded-lg ${predictionResults.length > 0 && "pointer-events-none"}`}
          >
            <Map
              id="location-picker-map"
              disableDoubleClickZoom
              onDblclick={onDoubleClick}
              // Default center on Australia
              defaultZoom={4}
              defaultCenter={{ lat: -25.2744, lng: 133.7751 }}
            >
              {pinCoordinates && (
                <Marker
                  position={{
                    lat: pinCoordinates.lat,
                    lng: pinCoordinates.lon,
                  }}
                />
              )}
            </Map>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => onConfirm(pinCoordinates)}
              disabled={pinCoordinates == null}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
