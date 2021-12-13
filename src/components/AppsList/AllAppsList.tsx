import { useApps } from "../../context/appsContext";
import "./AllAppsList.css";
import { ListItem } from "./ListItem/ListItem";

export const AllAppsList = () => {
  const { notSubscribedApps } = useApps();

  return (
    <div className="appsList">
      <header className="appsList__header">
        <div className="appsList__header__title">Apps</div>
        <div className="appsList__header__subtitle">Click to subscribe</div>
      </header>
      <div className="appsList__items">
        {notSubscribedApps.map((app) => (
          <ListItem
            key={app.id}
            id={app.id}
            name={app.name}
            company={app.company}
          />
        ))}
      </div>
    </div>
  );
};
