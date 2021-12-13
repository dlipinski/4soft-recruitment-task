import { useCallback, useMemo } from "react";
import { App, useAppsManager } from "../../../context/appsManagerContext";
import "./ListItem.css";

interface ListItemProps extends App {
  isSelected?: boolean;
}

export const ListItem = ({ id, name, company, isSelected }: ListItemProps) => {
  const { toggleAppSubscription } = useAppsManager();

  const onListItemClicked = useCallback(() => {
    toggleAppSubscription(id);
  }, [id, toggleAppSubscription]);

  const className = useMemo(
    () => (isSelected ? "listItem listItem--selected" : "listItem"),
    [isSelected]
  );

  return (
    <div className={className} onClick={onListItemClicked}>
      <span className="listItem__name">{name}</span>
      <span className="listItem__company">{company}</span>
    </div>
  );
};
