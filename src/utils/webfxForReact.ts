import { Callbacks, Ref, AnyFunc } from "./webfx";
import React, { useContext, useEffect, useState } from "react";

export function useWebfxRef<T>(ref: Ref<T>, tag?: string) {
    const [val, setVal] = useState(ref.value);
    useWebfxCallbacks(ref.onChanged, x => {
        // console.info('Ref changed', ref)
        if (tag) console.info('ref ' + tag + ' changed', x.value);
        setVal(x.value);
    }, [val], tag);
    if (val !== ref.value) setVal(ref.value);
    return val;
}

export function useWebfxCallbacks<T extends AnyFunc>(callbacks: Callbacks<T>, cb: T, deps?: React.DependencyList, tag?: string) {
    useEffect(() => {
        tag && console.info('callback add', tag);
        callbacks.add(cb);
        return () => {
            tag && console.info('callback remove', tag);
            callbacks.remove(cb);
        };
    }, deps ? [callbacks, cb, ...deps] : undefined);
}
