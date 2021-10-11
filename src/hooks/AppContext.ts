import React from "react";
import { ApiClient } from "../api";

export const AppContext = React.createContext<AppService>(null!);

export class AppService {
    apiClient = new ApiClient("mc-");
}
