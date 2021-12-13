import { useCallback } from "react";
import { Application, useApps } from "../../../context/appsContext";
import "./GridItem.css";

interface GridItemProps extends Application {
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
  const { selectId } = useApps();

  const onGridItemClicked = useCallback(() => {
    selectId(id);
  }, [id, selectId]);

  return (
    <div className="gridItem" onClick={onGridItemClicked}>
      <img className="gridItem__logo" src={logo} alt="App Logo" />
      <div className="gridItem__name">{name}</div>
      <div className="gridItem__company">{company}</div>
      <div className="gridItem__users">{activeUsers} active users</div>
    </div>
  );
};
