import React, { useContext } from "react";
import { ApiClient, UserInfo } from "./client";
import { useWebfxRef } from "./reactUtil";

export const ApiContext = React.createContext<ApiClient>(null!);

export function useClient() {
    return useContext(ApiContext);
}

export function useUserInfo(): UserInfo {
    return useWebfxRef(useClient().userInfo)!;
}
