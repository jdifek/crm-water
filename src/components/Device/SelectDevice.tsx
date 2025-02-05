import { devices } from "../../data/device/device";

interface SelectDeviceProps {
  selectedDeviceId: number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectDevice = ({
  selectedDeviceId,
  handleChange,
}: SelectDeviceProps) => {
  return (
    <select
      className="mb-3 border p-2 rounded"
      value={selectedDeviceId}
      onChange={handleChange}
    >
      {devices.map((device) => (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      ))}
    </select>
  );
};
