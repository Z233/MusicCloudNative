import { I18n, createStringBuilder, createArrayBuilder } from "./I18n";
import { Ref } from "../utils/webfx";
import { data } from "./data";

export class AppI18n {
    curlang = new Ref<string>('zh-cn');
    core = new I18n();
    I = createStringBuilder(this.core);
    IA = createArrayBuilder(this.core);
    languages = ['zh-cn', 'en-us'];

    init() {
        this.core.curLang = this.curlang.value;
        this.core.add2dArray([
            this.languages,
            ...data.split('\n').filter(x => x).map(x => x.split('|')),
        ])
    }
    
    setLanguage(lang: string) {
        this.core.curLang = lang;
        this.curlang.value = lang;
    }
}
