import { useApp } from "../hooks/AppContext";

export function useI18n() {
    const app = useApp();
    const lang = app.i18n.curlang.useValue();
    return app.i18n.I;
}

export function useI18nAdvanced() {
    const app = useApp();
    const lang = app.i18n.curlang.useValue();
    return { I: app.i18n.I, IA: app.i18n.IA };
}
