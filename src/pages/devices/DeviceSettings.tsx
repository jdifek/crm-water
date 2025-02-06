import { useState } from "react";
import { DeviceNavigate } from "../../components/Device/Navigate";
import { SelectDevice } from "../../components/Device/SelectDevice";
import { DeviceSidebar } from "../../components/Device/DeviceSidebar";
import { MachineState } from "../../components/Device/SettingsPage/MachineState";
import { Wifi } from "../../components/Device/SettingsPage/Wifi";
import { Interface } from "../../components/Device/SettingsPage/Interface";
import { Payment } from "../../components/Device/SettingsPage/Payment";
import { Other } from "../../components/Device/SettingsPage/Other";
import { DialSensor } from "../../components/Device/SettingsPage/DialSensor";
import { DispenserMode } from "../../components/Device/SettingsPage/DispenserMode";

const DeviceSettings = () => {
  const [active, setActive] = useState(true);
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="p-4 lg:p-8">
      <SelectDevice />

      <div className="flex gap-3 flex-nowrap w-full">
        <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1">
          <DeviceNavigate />

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
