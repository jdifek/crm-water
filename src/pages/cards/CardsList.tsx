import { useState } from "react";

const mockData = [
  {
    id: 123,
    date: "2025-01-28 15:57:35",
    number: "0023112930",
    code: "10",
    type: "Сервисная",
    holder: "Назва Технік",
    active: true,
    device: "№ 111781",
    address: "вул. Н, Кривий Ріг, Дніпропетровська о...",
    registered: true,
  },
  {
    id: 120,
    date: "2025-01-20 15:57:35",
    number: "12930",
    code: "8",
    type: "Сервия",
    holder: "Назва бред",
    active: true,
    device: "№ 231781",
    address: "вул. Н, харьков, Дніпропетровська о...",
    registered: true,
  },
  {
    id: 124,
    date: "2025-01-27 14:30:22",
    number: "0023112945",
    code: "12",
    type: "Обычная",
    holder: "Інженер А",
    active: false,
    device: "№ 111782",
    address: "вул. Г, Київ",
    registered: false,
  },
];

const ITEMS_PER_PAGE_OPTIONS = [1, 5, 10];

const TableComponent = () => {
  const [data] = useState(mockData);
  const [sortKey, setSortKey] = useState<keyof (typeof mockData)[0]>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showRegistered, setShowRegistered] = useState(true);

  const filteredData = data
    .filter((item) => item.registered === showRegistered)
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof (typeof mockData)[0]) => {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Выбор периода показа</h2>
      <div className="flex items-center gap-4 mb-4">
        <select className="border rounded p-2">
          <option>Все аппараты</option>
        </select>
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        {/* Переключение между "Зарегистрированные карты" и "Неизвестные карты" */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              !showRegistered ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setShowRegistered(false)}
          >
            НЕИЗВЕСТНЫЕ КАРТЫ
          </button>
          <button
            className={`px-4 py-2 rounded ${
              showRegistered ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setShowRegistered(true)}
          >
            ЗАРЕГИСТРИРОВАННЫЕ КАРТЫ
          </button>
        </div>
        <div className="relative mb-4">
          <span>Показать </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="appearance-none border-b border-gray-400 pb-1 text-gray-700 focus:outline-none focus:border-blue-500"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span> записей</span>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {[
                "id",
                "Дата",
                "Номер",
                "Тип",
                "Держатель",
                "Активные",
                "Девайс",
              ].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof (typeof mockData)[0])}
                  className="cursor-pointer px-4 py-2"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} ⬍
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">
                  {item.number}
                  <br />
                  <span className="text-sm text-gray-500">
                    Код: {item.code}
                  </span>
                </td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.holder}</td>
                <td className="px-4 py-2">{item.active ? "✔" : "✖"}</td>
                <td className="px-4 py-2">{item.device}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Пагинация */}
        <div className="flex justify-between items-center mt-4">
          <span>
            Записи с {currentPage} до{" "}
            {Math.ceil(sortedData.length / itemsPerPage)} из {sortedData.length}
          </span>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Предыдущая
            </button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded">
              {currentPage}
            </span>
            <button
              disabled={
                currentPage === Math.ceil(sortedData.length / itemsPerPage)
              }
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    Math.ceil(sortedData.length / itemsPerPage),
                    prev + 1
                  )
                )
              }
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Следующая
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
