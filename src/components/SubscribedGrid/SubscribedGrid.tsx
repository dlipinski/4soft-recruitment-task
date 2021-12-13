import { useApps } from "../../context/appsContext";
import { GridItem } from "./GridItem/GridItem";
import "./SubscribedGrid.css";

export const SubscribedGrid = () => {
  const { subscribedDetails } = useApps();

  return (
    <div className="subscribedGrid">
      <div className="subscribedGrid__items">
        {subscribedDetails.map((app) => (
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
