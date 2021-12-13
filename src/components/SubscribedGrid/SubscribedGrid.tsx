import { useAppsManager } from "../../context/appsManagerContext";
import { GridItem } from "./GridItem/GridItem";
import "./SubscribedGrid.css";

export const SubscribedGrid = () => {
  const { appsDetails } = useAppsManager();

  return (
    <div className="subscribedGrid">
      <div className="subscribedGrid__items">
        {Object.values(appsDetails).map((app) => (
          <GridItem
            key={app.id}
            id={app.id}
            name={app.name}
            company={app.company}
            logo={app.logo}
            activeUsers={app.number_of_active_users}
          />
        ))}
      </div>
    </div>
  );
};
