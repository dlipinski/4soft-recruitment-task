import { useCallback, useMemo } from "react";
import { useAppsManager } from "../../context/appsManagerContext";
import "./AppDetails.css";

export const AppDetails = () => {
  const {
    appsDetails,
    selectedAppId,
    unselectApp,
    subscribeApp,
    toggleAppSubscription,
  } = useAppsManager();

  const onCloseButtonClicked = useCallback(() => {
    unselectApp();
  }, [unselectApp]);

  const onRefreshButtonClicked = useCallback(() => {
    if (selectedAppId) {
      subscribeApp(selectedAppId);
    }
  }, [subscribeApp, selectedAppId]);

  const onUnsubscribeButtonClicked = useCallback(() => {
    if (selectedAppId) {
      toggleAppSubscription(selectedAppId);
    }
  }, [toggleAppSubscription, selectedAppId]);

  const selectedApp = useMemo(
    () => (selectedAppId ? appsDetails[selectedAppId] : null),
    [appsDetails, selectedAppId]
  );

  if (!selectedApp) return null;

  return (
    <div className="appDetails">
      <div className="appDetails__header">
        <span className="appDetails__header__name">{selectedApp.name}</span>
        <button onClick={onUnsubscribeButtonClicked}>Unsubscribe</button>
        <button onClick={onRefreshButtonClicked}>Refresh</button>
        <button onClick={onCloseButtonClicked}>Close</button>
      </div>
      <ul className="appDetails__data">
        <li>
          <strong>Users</strong>: {selectedApp.number_of_users}
        </li>
        <li>
          <strong>Active Users</strong>: {selectedApp.number_of_active_users}
        </li>
        <li>
          <strong>Server Address</strong>: {selectedApp.server_address}
        </li>
        <li>
          <strong>Admin</strong>: {selectedApp.admin.first_name}{" "}
          {selectedApp.admin.last_name} ({selectedApp.admin.email})
        </li>
      </ul>
    </div>
  );
};
