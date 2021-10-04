import { Callbacks, Ref } from "./webfxUtil";
import React, { useContext, useEffect, useState } from "react";

export type AnyFunc = (...args: any) => any;
export type Action<T = void> = (arg: T) => void;
export type Func<TRet> = () => TRet;
export type AsyncFunc<T> = Func<Promise<T>>;

export type FuncOrVal<T> = T | Func<T>;

export function useWebfxRef<T>(ref: Ref<T>) {
    const [val, setVal] = useState(ref.value);
    useWebfxCallbacks(ref.onChanged, x => {
        // console.info('Ref changed', ref)
        if (val !== x.value) setVal(x.value);
    }, [val]);
    return val;
}

export function useWebfxCallbacks<T extends AnyFunc>(callbacks: Callbacks<T>, cb: T, deps?: React.DependencyList) {
    useEffect(() => {
        callbacks.add(cb);
        return () => callbacks.remove(cb);
    }, deps);
}
