import { useApp } from "../hooks/AppContext";

export function useI18n() {
    const app = useApp();
    const lang = app.i18n.curlang.useValue();
    return app.i18n.I;
}
