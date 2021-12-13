import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface Application {
  id: number;
  name: string;
  company: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface AppDetails extends Application {
  logo: string;
  number_of_users: number;
  number_of_active_users: number;
  server_address: string;
  admin: User;
}

interface initialStateI {
  allApps: Application[];
  subscribedApps: Application[];
  notSubscribedApps: Application[];
  subscribedDetails: AppDetails[];
  selectedAppDetails?: AppDetails;
  selectId: (id: number) => void;
  subscribeApp: (id: number) => void;
  unsubscribeApp: (id: number) => void;
  unselectId: () => void;
}

const initialState: initialStateI = {
  allApps: [],
  subscribedApps: [],
  notSubscribedApps: [],
  subscribedDetails: [],
  subscribeApp: (id: number) => {},
  unsubscribeApp: (id: number) => {},
  selectId: (id: number) => {},
  unselectId: () => {},
};

const AppsContext = createContext(initialState);

export const useApps = () => useContext(AppsContext);

interface AppsProviderProps {
  children: JSX.Element | JSX.Element[];
}

const fetchApps = () =>
  fetch("https://api.recruitment.4soft.tech/list").then((res) => res.json());

const fetchAppDetails = (id: number) =>
  fetch(`https://api.recruitment.4soft.tech/details/${id}`).then((res) =>
    res.json()
  );

export const AppsProvider = ({ children }: AppsProviderProps) => {
  const [allApps, setAllApps] = useState<Application[]>([]);
  const [subscribedIds, setSubscribedIds] = useState<number[]>([]);
  const [subscribedDetails, setSubscribedDetails] = useState<AppDetails[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>();

  useEffect(() => {
    fetchApps().then((res) => setAllApps(res));
  }, []);

  useEffect(() => {
    const fetchSubscribedDetails = async () => {
      const requests = [];
      for (const subscribedId of subscribedIds) {
        requests.push(fetchAppDetails(subscribedId));
      }
      const response = await Promise.all(requests);
      setSubscribedDetails(response);
    };
    fetchSubscribedDetails();
    const interval = setInterval(fetchSubscribedDetails, 5 * 1000);

    return () => clearInterval(interval);
  }, [subscribedIds]);

  const subscribeApp = useCallback((id: number) => {
    setSubscribedIds((subscribedIds) => [...subscribedIds, id]);
  }, []);

  const unsubscribeApp = useCallback((id: number) => {
    setSubscribedIds((subscribedIds) =>
      subscribedIds.filter((subscribedId) => subscribedId !== id)
    );
  }, []);

  const selectId = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const unselectId = useCallback(() => {
    setSelectedId(null);
  }, []);

  const subscribedApps = useMemo(
    () => allApps.filter((app) => subscribedIds.includes(app.id)),
    [allApps, subscribedIds]
  );

  const notSubscribedApps = useMemo(
    () => allApps.filter((app) => !subscribedIds.includes(app.id)),
    [allApps, subscribedIds]
  );

  const selectedAppDetails = useMemo(
    () => subscribedDetails.find((app) => app.id === selectedId),
    [subscribedDetails, selectedId]
  );

  return (
    <AppsContext.Provider
      value={{
        allApps,
        subscribedApps,
        notSubscribedApps,
        subscribeApp,
        unsubscribeApp,
        subscribedDetails,
        selectedAppDetails,
        selectId,
        unselectId,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
};
