import { useCallback } from "react";
import { Application, useApps } from "../../../context/appsContext";
import "./ListItem.css";
interface ListItemProps extends Application {}

export const ListItem = ({ id, name, company }: ListItemProps) => {
  const { subscribeApp } = useApps();

  const onListItemClicked = useCallback(() => {
    subscribeApp(id);
  }, [id, subscribeApp]);

  return (
    <div className="listItem" onClick={onListItemClicked}>
      <span className="listItem__name">{name}</span>
      <span className="listItem__company">{company}</span>
    </div>
  );
};
