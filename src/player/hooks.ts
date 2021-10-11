import { useApp } from "../hooks/AppContext";

export function usePlayer() {
    return useApp().player;
}
