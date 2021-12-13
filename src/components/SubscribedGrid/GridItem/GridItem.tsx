import { useCallback } from "react";
import { App, useAppsManager } from "../../../context/appsManagerContext";
import "./GridItem.css";

interface GridItemProps extends App {
  activeUsers: number;
  logo: string;
}

export const GridItem = ({
  id,
  name,
  company,
  activeUsers,
  logo,
}: GridItemProps) => {
  const { selectApp } = useAppsManager();

  const onGridItemClicked = useCallback(() => {
    selectApp(id);
  }, [id, selectApp]);

  return (
    <div className="gridItem" onClick={onGridItemClicked}>
      <img className="gridItem__logo" src={logo} alt="App Logo" />
      <div className="gridItem__name">{name}</div>
      <div className="gridItem__company">{company}</div>
      <div className="gridItem__users">{activeUsers} active users</div>
    </div>
  );
};
