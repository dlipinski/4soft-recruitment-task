import { useCallback } from "react";
import { useApps } from "../../context/appsContext";
import "./AppDetails.css";

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface AppDetails {
  logo: string;
  number_of_users: number;
  number_of_active_users: number;
  server_address: string;
  admin: User;
}
export const AppDetails = () => {
  const { selectedAppDetails, unselectId } = useApps();

  const onCloseButtonClicked = useCallback(() => {
    unselectId();
  }, [unselectId]);

  if (!selectedAppDetails) return null;

  return (
    <div className="appDetails">
      <div className="appDetails__header">
        <span className="appDetails__header__name">
          {selectedAppDetails.name}
        </span>
        <button onClick={onCloseButtonClicked}>Close</button>
      </div>
      <ul className="appDetails__data">
        <li>
          <strong>Users</strong>: {selectedAppDetails.number_of_users}
        </li>
        <li>
          <strong>Active Users</strong>:{" "}
          {selectedAppDetails.number_of_active_users}
        </li>
        <li>
          <strong>Server Address</strong>: {selectedAppDetails.server_address}
        </li>
        <li>
          <strong>Admin</strong>: {selectedAppDetails.admin.first_name}{" "}
          {selectedAppDetails.admin.last_name} ({selectedAppDetails.admin.email}
          )
        </li>
      </ul>
    </div>
  );
};
