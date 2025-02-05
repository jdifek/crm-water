import { useState } from "react";
import { DeviceNavigate } from "../../components/Device/Navigate";
import { useNavigate } from "react-router-dom";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { devices } from "../../data/device/device";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";
import { MachineState } from "../../components/Device/SettingsPage/MachineState";
import { Wifi } from "../../components/Device/SettingsPage/Wifi";
import { Interface } from "../../components/Device/SettingsPage/Interface";
import { Payment } from "../../components/Device/SettingsPage/Payment";
import { Other } from "../../components/Device/SettingsPage/Other";
import { DialSensor } from "../../components/Device/SettingsPage/DialSensor";
import { DispenserMode } from "../../components/Device/SettingsPage/DispenserMode";

const DeviceSettings = () => {
  const navigate = useNavigate();

  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id);
  const [active, setActive] = useState(true);
  const [isOn, setIsOn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedDeviceId(id);
    navigate(`/devices/details/${id}`);
  };

  return (
    <div className="p-4 lg:p-8">
      <SelectDevice
        handleChange={handleChange}
        selectedDeviceId={selectedDeviceId}
      />

      <div className="flex gap-3 flex-nowrap w-full">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1">
          <DeviceNavigate selectedDeviceId={selectedDeviceId} />

          <MachineState active={active} setActive={setActive} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Wifi />

            <Interface />

            <Payment />

            <Other />

            <DialSensor isOn={isOn} setIsOn={setIsOn} />

            <DispenserMode />
          </div>
        </div>

        <DeviceSidebar />
      </div>
    </div>
  );
};

export default DeviceSettings;
