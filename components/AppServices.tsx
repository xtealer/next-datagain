import { FC, ReactNode } from "react";
import useValidateSession from "../hooks/useValidateSession";
import useEmitAppStartedEvent from "../useEmitAppStartedEvent";

const AppServices: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  useEmitAppStartedEvent();
  useValidateSession();

  return <>{children}</>;
};

export default AppServices;
