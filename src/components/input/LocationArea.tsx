import clsx from "clsx";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
  containerClassName?: string;
  required?: boolean | string;
  requiredMark?: boolean;
  defaultValue?: unknown;
}

const MapEvent = ({ onChange }: any) => {
  useMapEvents({
    click: (e: any) => {
      onChange({
        latitude: e?.latlng?.lat,
        longitude: e?.latlng?.lng,
      });
    },
  });
  return null;
};

const Textarea: FC<Props> = ({
  name,
  control,
  label,
  containerClassName,
  required,
  requiredMark,
  defaultValue,
}) => {
  return (
    <div className={clsx("form-control mt-2", containerClassName)}>
      {label && (
        <label htmlFor="address" className="label">
          <span
            className={clsx("text-sm font-medium md:text-base", {
              'after:mr-1 after:text-red-600 after:content-["*"]': requiredMark,
            })}
          >
            {label}
          </span>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <>
            <div
              className={clsx("border-2 rounded-lg", {
                "border-rose-400": !!fieldState.error,
              })}
            >
              <MapContainer
                className="rounded-lg"
                center={{
                  lat: field?.value?.latitude || 35.7219,
                  lng: field?.value?.longitude || 51.3347,
                }}
                zoom={13}
                style={{ width: "100%", height: "220px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvent onChange={field.onChange} />
                {field.value?.latitude && field.value?.longitude && (
                  <Marker
                    position={[field.value?.latitude, field.value?.longitude]}
                  >
                    <Popup>مکان انتخاب شده</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
            {!!fieldState.error && (
              <span className="mt-2 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Textarea;
