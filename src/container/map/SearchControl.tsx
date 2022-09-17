import { useEffect, FC } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { positionMap } from "@/types/post";

export interface Props {
  onChange?: (position: positionMap) => void;
}

const SearchControl: FC<Props> = ({ onChange }) => {
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
    searchLabel: "مکان موردنظر خود را جستجو کنید",
    notFoundMessage: "مکانی بافت نشد",
    showMarker: false,
    maxMarkers: 1,
    showPopup: false,
    style: "bar",
    animateZoom: true,
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/showlocation", (event: any) => {
      if (onChange) {
        onChange({
          latitude: event?.marker?._latlng?.lat,
          longitude: event?.marker?._latlng?.lng,
        });
      }
    });
    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
};

export default SearchControl;
