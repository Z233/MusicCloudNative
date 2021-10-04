//@ts-nocheck
// file: utils.ts

const _object_assign = Object.assign;
const _object_hasOwnProperty = Object.prototype.hasOwnProperty;

// Time & formatting utils:

export function strPadLeft(str: string, len: number, ch: string = ' ') {
    while (str.length < len) {
        str = ch + str;
    }
    return str;
}

export function formatTime(sec: number | any) {
    if (typeof sec !== 'number' || isNaN(sec)) return '--:--';
    sec = Math.round(sec);
    var min = Math.floor(sec / 60);
    sec %= 60;
    return strPadLeft(min.toString(), 2, '0') + ':' + strPadLeft(sec.toString(), 2, '0');
}

const fileSizeUnits = ['B', 'KB', 'MB', 'GB'];
export function formatFileSize(size: number | any) {
    if (typeof size !== "number" || isNaN(size)) return 'NaN';
    var unit = 0;
    while (unit < fileSizeUnits.length - 1 && size >= 1024) {
        unit++;
        size /= 1024;
    }
    return size.toFixed(2) + ' ' + fileSizeUnits[unit];
}

export function formatDateTime(date: Date) {
    var now = new Date();
    var sameday = date.getFullYear() === now.getFullYear()
        && date.getMonth() === now.getMonth()
        && date.getDate() === now.getDate();
    return sameday ? date.toLocaleTimeString() : date.toLocaleString();
}

export function numLimit(num: number, min: number, max: number) {
    return (num < min || typeof num != 'number' || isNaN(num)) ? min :
        (num > max) ? max : num;
}

export function createName(nameFunc: (num: number) => string, existsFunc: (str: string) => boolean) {
    for (let num = 0; ; num++) {
        let str = nameFunc(num);
        if (!existsFunc(str)) return str;
    }
}

export function sleepAsync(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export function arrayRemove<T>(array: T[], val: T) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === val) {
            array.splice(i, 1);
            i--;
        }
    }
}

export function arrayInsert<T>(array: T[], val: T, pos?: number) {
    if (pos === undefined) array.push(val);
    else array.splice(pos, 0, val);
}

export function arrayMap<T, TRet>(arr: Iterable<T>, func: (item: T, idx: number) => TRet) {
    if (arr instanceof Array) return arr.map(func);
    var idx = 0;
    var ret = new Array<TRet>((arr as any).length);
    for (var item of arr) {
        ret[idx] = (func(item, idx));
        idx++;
    }
    return ret;
}

export function arrayForeach<T>(arr: Iterable<T>, func: (item: T, idx: number) => void) {
    var idx = 0;
    for (var item of arr) {
        func(item, idx++);
    }
}


export function foreachFlaten<T>(arr: T[], func: Action<T>) {
    for (const it of arr) {
        if (it instanceof Array) {
            foreachFlaten(it as T[], func);
        } else {
            func(it);
        }
    }
}

export function arrayFind<T>(arr: Iterable<T>, func: (item: T, idx: number) => any): T | null {
    if (arr instanceof Array) return arr.find(func);
    var idx = 0;
    for (var item of arr) {
        if (func(item, idx++)) return item;
    }
    return null;
}

export function arraySum<T>(arr: Iterable<T>, func: (item: T) => number | null | undefined) {
    var sum = 0;
    arrayForeach(arr, (x) => {
        var val = func(x);
        if (val) sum += val;
    });
    return sum;
}

export function objectApply<T>(obj: Partial<T>, kv?: Partial<T>, keys?: Array<keyof T>) {
    if (kv) {
        if (!keys) return _object_assign(obj, kv);
        for (const key in kv as any) {
            if (_object_hasOwnProperty.call(kv, key) && (!keys || keys.indexOf(key as any) >= 0)) {
                const val = kv[key];
                obj[key] = val;
            }
        }
    }
    return obj;
}

export function objectInit<T>(obj: T, kv?: ObjectInit<T>, keys?: Array<keyof T>) {
    if (kv) {
        for (const key in kv as any) {
            if (_object_hasOwnProperty.call(kv, key) && (!keys || keys.indexOf(key as any) >= 0)) {
                const val = kv[key];
                if (key.startsWith("on") && obj[key] instanceof Callbacks) {
                    (obj[key] as Callbacks).add(val);
                } else {
                    obj[key] = val;
                }
            }
        }
    }
    return obj;
}

export function mod(a: number, b: number): number {
    if (a < 0) a = b + a;
    return a % b;
}

export function readBlobAsDataUrl(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = (ev) => {
            resolve(reader.result as string);
        };
        reader.onerror = (ev) => reject();
        reader.readAsDataURL(blob);
    });
}

Array.prototype.remove = function (item) {
    arrayRemove(this, item);
};

declare global {
    interface Array<T> {
        /**
         * (Extension method) remove the specified item from array.
         * @param item The item to be removed from array
         */
        remove(item: T): void;
    }
}

export type ObjectInit<T> = Partial<ConvertObjectWithCallbacks<T>>;

export type ConvertObjectWithCallbacks<T> = {
    [P in keyof T]: P extends `on${string}` ? CallbackInit<T[P]> : T[P];
};

export type CallbackInit<T> = T extends Callbacks<infer U> ? T | U : T;

export function startBlockingDetect(threshold = 20) {
    var begin = Date.now();
    var lastRun = Date.now();
    setInterval(() => {
        var now = Date.now();
        if (now - lastRun >= threshold) {
            console.info(`[Blocking] ${(now - begin) / 1000}s: blocked for ${now - lastRun} ms`);
        }
        lastRun = now;
    }, 1);
}

export class Timer {
    callback: () => void;
    cancelFunc: (() => void) | undefined;
    constructor(callback: () => void) {
        this.callback = callback;
        this.cancelFunc = undefined;
    }
    timeout(time: number) {
        this.tryCancel();
        var handle = setTimeout(this.callback, time);
        this.cancelFunc = () => globalThis.clearTimeout(handle);
    }
    interval(time: number) {
        this.tryCancel();
        var handle = setInterval(this.callback, time);
        this.cancelFunc = () => globalThis.clearInterval(handle);
    }
    animationFrame() {
        this.tryCancel();
        var handle = requestAnimationFrame(this.callback);
        this.cancelFunc = () => cancelAnimationFrame(handle);
    }
    tryCancel() {
        if (this.cancelFunc) {
            this.cancelFunc();
            this.cancelFunc = undefined;
        }
    }
}

export type PtrEvent = ({
    type: 'mouse';
    ev: MouseEvent;
} | {
    type: 'touch';
    touch: 'start' | 'move' | 'end';
    ev: TouchEvent;
}) & {
    action: 'down' | 'move' | 'up';
    point: MouseEvent | Touch;
};


// Some interesting function types:
export type AnyFunc = (...args: any) => any;
export type Action<T = void> = (arg: T) => void;
export type Func<TRet> = () => TRet;
export type AsyncFunc<T> = Func<Promise<T>>;

export type FuncOrVal<T> = T | Func<T>;


interface SiType<T> {
    serialize: (obj: T) => string;
    deserialize: (str: string) => T;
}

class CallbacksImpl<T extends AnyFunc = Action> extends Array<T> {
    private _hook?: Callbacks<(adding: boolean, func: T) => void> = undefined;
    get onChanged() {
        this._hook = this._hook ?? new Callbacks();
        return this._hook;
    }
    invoke(...args: Parameters<T>) {
        this.forEach((x) => {
            try {
                x.apply(this, args);
            } catch (error) {
                console.error("Error in callback", error);
            }
        });
    }
    add(callback: T) {
        this.push(callback);
        this._hook?.invoke(true, callback);
        return callback;
    }
    remove(callback: T) {
        super.remove(callback);
        this._hook?.invoke(false, callback);
    }
}

export interface Callbacks<T extends AnyFunc = Action> {
    invoke(...args: Parameters<T>): void;
    add(callback: T): T;
    remove(callback: T): void;
    readonly length: number;
    readonly onChanged: Callbacks<(adding: boolean, func: T) => void>;
}
export const Callbacks: { new <T extends AnyFunc = Action>(): Callbacks<T>; } = CallbacksImpl;

export class Ref<T> {
    private _value: T | undefined = undefined;
    private _onChanged: Callbacks<Action<Ref<T>>> | undefined = undefined;
    get onChanged() {
        if (!this._onChanged) this._onChanged = new Callbacks();
        return this._onChanged;
    }
    get value() { return this._value; }
    set value(val) {
        this._value = val;
        if (this._onChanged) this.onChanged.invoke(this);
    }
}

export class Lazy<T> {
    private _func?: Func<T>;
    private _value?: T;
    get computed() { return !this._func; }
    get rawValue() { return this._value; }
    get value(): T {
        if (this._func) {
            this._value = this._func();
            this._func = undefined;
        }
        return this._value!;
    }
    constructor(func: Func<T>) {
        this._func = func;
        this._value = undefined;
    }
}

export class Semaphore {
    queue = new Array<Action>();
    maxCount = 1;
    runningCount = 0;
    constructor(init: ObjectInit<Semaphore>) {
        objectInit(this, init);
    }
    enter(): Promise<any> {
        if (this.runningCount === this.maxCount) {
            var resolve: Action;
            var prom = new Promise((res) => { resolve = res; });
            this.queue.push(resolve!);
            return prom;
        } else {
            this.runningCount++;
            return Promise.resolve();
        }
    }
    exit() {
        if (this.runningCount === this.maxCount && this.queue.length) {
            if (window.queueMicrotask) {
                window.queueMicrotask(this.queue.shift() as any);
            } else {
                setTimeout(this.queue.shift()!, 0);
            }
        } else {
            this.runningCount--;
        }
    }
    async run(func: () => Promise<any>) {
        await this.enter();
        try {
            await func();
        } finally {
            this.exit();
        }
    }
}

/** Just like CancellationToken[Source] on .NET */
export class CancelToken {
    cancelled = false;
    onCancelled = new Callbacks();
    cancel() {
        if (this.cancelled) return;
        this.cancelled = true;
        this.onCancelled.invoke();
    }
    throwIfCancelled() {
        if (this.cancelled)
            throw new Error("operation cancelled.");
    }
}

export class AutoResetEvent {
    private _whenNotify: Promise<void> | null = null;
    private _callback: Action | null = null;

    wait() {
        if (!this._whenNotify) {
            this._whenNotify = new Promise(r => {
                this._callback = () => {
                    this._callback = this._whenNotify = null;
                    r();
                };
            });
        }
        return this._whenNotify;
    }
    set() {
        this._callback && this._callback();
    }
}

export interface IId {
    id: keyof any;
}

export class DataUpdatingHelper<T extends IId, TData extends IId = T> {
    items: Iterable<T>;
    update(newData: Iterable<TData>) {
        const oldData = this.items;
        var dataDict: Record<keyof any, TData> = {};
        for (const n of newData) {
            dataDict[this.dataSelectId(n)] = n;
        }
        var itemDict: Record<any, T> = {};
        var removed: T[] = [];
        for (const d of oldData) {
            const id = this.selectId(d);
            if (dataDict[id] !== undefined) {
                itemDict[id] = d;
            } else {
                removed.push(d);
            }
        }
        for (let i = removed.length - 1; i >= 0; i--)
            this.removeItem(removed[i]);
        var pos = 0;
        for (const n of newData) {
            const d = itemDict[this.dataSelectId(n)];
            if (d !== undefined) {
                this.updateItem(d, n);
            } else {
                this.addItem(n, pos);
            }
            pos++;
        }
    }
    updateOrRebuildAll(newData: Iterable<TData>) {
        this.update(newData);
        if (!this.isSame(newData)) this.rebuildAll(newData);
    }
    isSame(newData: Iterable<TData>) {
        var t = this.items[Symbol.iterator]();
        for (const n of newData) {
            var d = t.next();
            if (d.done) return false;
            if (this.selectId(d.value) !== this.dataSelectId(n)) return false;
        }
        if (!t.next().done) return false;
        return true;
    }
    rebuildAll(newData: Iterable<TData>) {
        var oldData = this.items;
        if (oldData instanceof Array) {
            for (let i = oldData.length - 1; i >= 0; i--) {
                this.removeItem(oldData[i]);
            }
        } else {
            for (const o of oldData) {
                this.removeItem(o);
            }
        }
        let i = 0;
        for (const n of newData) {
            this.addItem(n, i++);
        }
    }
    protected selectId(obj: T): any { return obj.id; }
    protected dataSelectId(obj: TData): any { return obj.id; }
    addItem(obj: TData, pos: number) { }
    updateItem(old: T, data: TData) { }
    removeItem(obj: T) { }
}

export class EventRegistrations {
    list: { event: Callbacks; func: AnyFunc; }[] = [];
    add<T extends AnyFunc>(event: Callbacks<T>, func: T) {
        this.list.push({ event, func });
        event.add(func);
        return func;
    }
    removeAll() {
        while (this.list.length) {
            var r = this.list.pop()!;
            r.event.remove(r.func);
        }
    }
}
