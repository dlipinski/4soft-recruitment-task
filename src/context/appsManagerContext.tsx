import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface App {
  id: number;
  name: string;
  company: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface AppDetails extends App {
  logo: string;
  number_of_users: number;
  number_of_active_users: number;
  server_address: string;
  admin: User;
}

interface AppsDetails {
  [key: number]: AppDetails | undefined;
}

interface AppsManagerState {
  allApps: App[];
  appsDetails: AppsDetails;
  selectedAppId?: number;
  subscribeApp: (id: number) => void;
  selectApp: (id: number) => void;
  unselectApp: () => void;
  toggleAppSubscription: (id: number) => void;
}

const initialState: AppsManagerState = {
  allApps: [],
  appsDetails: {},
  selectedAppId: undefined,
  subscribeApp: (id: number) => {},
  selectApp: (id: number) => {},
  unselectApp: () => {},
  toggleAppSubscription: (id: number) => {},
};

interface AppsProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AppsManagerContext = createContext(initialState);

export const useAppsManager = () => useContext(AppsManagerContext);

const fetchAllApps = () =>
  fetch("https://api.recruitment.4soft.tech/list").then((res) => res.json());

const fetchAppDetails = (id: number) =>
  fetch(`https://api.recruitment.4soft.tech/details/${id}`).then((res) =>
    res.json()
  );

export const AppsManagerProvider = ({ children }: AppsProviderProps) => {
  const [allApps, setAllApps] = useState<App[]>([]);
  const [appsDetails, setAppsDetails] = useState<AppsDetails>({});
  const [selectedAppId, setSelectedAppId] = useState<number>();

  useEffect(() => {
    fetchAllApps()
      .then((res) => setAllApps(res))
      .catch((e) => console.warn(e));
  }, []);

  const subscribeApp = useCallback((id: number) => {
    fetchAppDetails(id)
      .then((appDetails) =>
        setAppsDetails((appsDetails) => ({ ...appsDetails, [id]: appDetails }))
      )
      .catch((e) => console.warn(e));
  }, []);

  const unsubscribeApp = useCallback((id: number) => {
    setAppsDetails((appsDetails) => {
      const newAppsDetails = { ...appsDetails };
      delete newAppsDetails[id];
      return newAppsDetails;
    });
  }, []);

  const toggleAppSubscription = useCallback(
    (id: number) => {
      if (appsDetails[id]) {
        unsubscribeApp(id);
      } else {
        subscribeApp(id);
      }
    },
    [subscribeApp, unsubscribeApp, appsDetails]
  );

  const selectApp = useCallback((id: number) => {
    setSelectedAppId(id);
  }, []);

  const unselectApp = useCallback(() => {
    setSelectedAppId(undefined);
  }, []);

  return (
    <AppsManagerContext.Provider
      value={{
        allApps,
        appsDetails,
        subscribeApp,
        selectedAppId,
        selectApp,
        unselectApp,
        toggleAppSubscription,
      }}
    >
      {children}
    </AppsManagerContext.Provider>
  );
};
