import { useMemo, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CollectionTableSection from "../../components/statistics/CollectionTableSection";
import { CollectionTableData } from "../../types";
import { ru } from "date-fns/locale";
import { CashCollectionsService } from "../../api/PosDevices/PosDevicesService";

// Функція форматування дати для API
const formatDateForApi = (date: Date | null): string => {
  return date ? date.toISOString().split("T")[0] : "";
};

const Collection = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date('2025-02-01'), // Початок лютого 2025
    new Date('2025-03-31'), // Кінець березня 2025
  ])
  const [selectedDevice, setSelectedDevice] = useState("Усі апарати");
  const [tableData, setTableData] = useState<CollectionTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startDate, endDate] = dateRange;

  // Завантаження даних із API
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CashCollectionsService.getCashCollections({
          date_st: formatDateForApi(startDate),
          date_fn: formatDateForApi(endDate),
          limit: 100,
          device_id:
            selectedDevice !== "Усі апарати"
              ? Number(selectedDevice)
              : undefined,
          type: undefined,
        });

        // Мапінг даних із API у формат CollectionTableData
        const mappedData: CollectionTableData[] = response.results.map(
          (item) => ({
            id: item.id,
            date: new Date(item.collected_at).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
            }),
            device: item.device.name,
            type: item.type === "bills" ? "Купюры" : "Монеты",
            collector: item.who_collected.full_name,
            quantity: item.total_quantity,
            amount: Number(item.total_amount),
          })
        );

        console.log("Mapped Data:", mappedData);
setTableData(mappedData);
console.log("Updated tableData:", tableData);
      } catch (err) {
        setError("Помилка при завантаженні даних");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [startDate, endDate, selectedDevice]);

  const filteredData = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const filtered = tableData.filter(({ date }) => {
      const [day, month] = date.split(".");
      const itemDate = new Date(2025, Number(month) - 1, Number(day)); // Припускаємо 2025 рік
      return (!start || itemDate >= start) && (!end || itemDate <= end);
    });
    console.log("Start:", start, "End:", end, "Filtered Data:", filtered);
    return filtered;
  }, [tableData, startDate, endDate]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
          <DatePicker
            locale={ru}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) =>
              setDateRange(update as [Date | null, Date | null])
            }
            isClearable
            className="px-2 py-1 text-gray-700 bg-transparent w-56 outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className="border border-gray-300 rounded-lg w-48 py-2 pl-2 pr-4 outline-none text-gray-700"
        >
          <option>Усі апарати</option>
          <option value="37">Device-2 (37)</option>
          {/* Додайте більше апаратів із API /pos/devices/ */}
        </select>
      </div>

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <CollectionTableSection tableData={filteredData} />
      )}
    </div>
  );
};

export default Collection;
