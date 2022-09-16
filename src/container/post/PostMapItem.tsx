import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  title: string;
};

const PostMapItem: FC<Props> = ({ lat, lng, title }) => {
  return (
    <>
      <span className="text-base font-bold mb-2">{title}</span>
      <MapContainer
        className="rounded-lg"
        center={{
          lat: lat,
          lng: lng,
        }}
        zoom={13}
        style={{ width: "100%", height: "220px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>مکان انتخاب شده</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default PostMapItem;
