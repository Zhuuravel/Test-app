import {Navigate, Route, Routes} from "react-router-dom";
import {AppLayout} from "./AppLayout";
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SimpleFormPage} from "../pages/SimpleFormPage";
import {TabbedFormPage} from "../pages/TabbedFormPage";
import {WizardFormPage} from "../pages/WizzardFormPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/simple-form" replace />} />
          <Route path="simple-form" element={<SimpleFormPage />} />
          <Route path="tabbed-form" element={<TabbedFormPage />} />
          <Route path="wizard-form" element={<WizardFormPage />} />
        </Route>
      </Routes>
  );
};

export default App;
