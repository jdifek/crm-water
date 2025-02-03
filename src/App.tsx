import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceDetails from "./pages/devices/DeviceDetails";
import DeviceSettings from "./pages/devices/DeviceSettings";
import DeviceRegulations from "./pages/devices/DeviceRegulations";
import Statistics from "./pages/statistics/Statistics";
import CardsList from "./pages/cards/CardsList";
import MaintenanceHistory from "./pages/maintenance/MaintenanceHistory";
import Users from "./pages/admin/Users";
import DevicesList from "./components/DevicesList";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Devices */}
          <Route path="/devices/list" element={<DevicesList />} />
          <Route path="/devices/details/:id" element={<DeviceDetails />} />
          <Route path="/devices/settings/:id" element={<DeviceSettings />} />
          <Route
            path="/devices/regulations/:id"
            element={<DeviceRegulations />}
          />

          {/* Statistics */}
          <Route path="/stats/sales" element={<Statistics />} />
          {/* <Route path="/stats/by-days" element={<SalesByDay />} /> */}
          {/* <Route path="/stats/daily" element={<DailyStats />} /> */}
          {/* <Route path="/stats/devices" element={<DeviceStats />} /> */}
          {/* <Route path="/stats/collection" element={<Collection />} /> */}
          {/* <Route path="/stats/by-liters" element={<LiterStats />} /> */}
          {/* <Route path="/stats/yearly" element={<YearlyReport />} /> */}

          {/* Cards */}
          <Route path="/cards/list" element={<CardsList />} />
          {/* <Route path="/cards/connections" element={<CardConnections />} /> */}

          {/* Maintenance */}
          <Route path="/maintenance/history" element={<MaintenanceHistory />} />

          {/* Settings */}
          {/* <Route path="/settings/branch" element={<BranchSettings />} /> */}
          {/* <Route path="/settings/admin" element={<AdminSettings />} /> */}

          {/* Administration */}
          <Route path="/admin/users" element={<Users />} />
          {/* <Route path="/admin/access" element={<Access />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
