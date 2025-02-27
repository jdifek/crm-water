import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import ProductsService from "../../api/Products/ProductsService";
import PosDevicesService from "../../api/PosDevices/PosDevicesService";

interface StatisticsFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
}

const StatisticsFilter = ({
  startDate,
  endDate,
  setDateRange,
}: StatisticsFilterProps) => {
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [deviceNames, setDeviceNames] = useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductsService.getProducts();
      setProducts(response.data?.results || []); // Правильный путь к данным
    } catch (error) {
      console.error("Ошибка при загрузке продуктов", error);
      setProducts([]); // Гарантия, что не будет undefined
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceNames = async () => {
    setLoading(true);
    try {
      const response = await PosDevicesService.getDevicesNames();
      setDeviceNames(response.data?.results || []); // Правильный путь к данным
    } catch (error) {
      console.error("Ошибка при загрузке getDevicesNames", error);
      setProducts([]); // Гарантия, что не будет undefined
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDeviceNames();
  }, []);

  return (
    <div className="bg-white p-5 pb-7 rounded-lg shadow-md mb-4">
      <h2 className="font-semibold mb-2">Фильтр</h2>
      <div className="border-b border-gray-300 pb-2 mb-10 w-56">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          locale={ru}
          onChange={(update) =>
            setDateRange(update as [Date | null, Date | null])
          }
          isClearable
          className="px-2 py-1 text-gray-700 bg-transparent w-56 outline-none focus:ring-0 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-[14px]">
        <select className="border p-2 rounded w-full">
          <option>Все торговые точки</option>
          {loading ? (
            <option disabled>Загрузка...</option>
          ) : (
            deviceNames.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))
          )}
        </select>
        <select className="border p-2 rounded w-full">
          <option>Все типы</option>
          <option>Наличные</option>
          <option>Безналичные</option>
        </select>
        <select className="border p-2 rounded w-full">
          <option>Все товары</option>
          {loading ? (
            <option disabled>Загрузка...</option>
          ) : (
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default StatisticsFilter;
