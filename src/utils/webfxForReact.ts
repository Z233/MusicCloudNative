import { Callbacks, Ref, AnyFunc } from "./webfx";
import React, { useContext, useEffect, useState } from "react";

export function useWebfxRef<T>(ref: Ref<T>, tag?: string) {
    const [val, setVal] = useState(ref.value);
    useWebfxCallbacks(ref.onChanged, x => {
        // console.info('Ref changed', ref)
        if (tag) console.info('ref ' + tag + ' changed', x.value);
        setVal(x.value);
    }, [val]);
    if (val !== ref.value) setVal(ref.value);
    return val;
}

export function useWebfxCallbacks<T extends AnyFunc>(callbacks: Callbacks<T>, cb: T, deps?: React.DependencyList) {
    useEffect(() => {
        callbacks.add(cb);
        return () => callbacks.remove(cb);
    }, deps ? [callbacks, cb, deps] : undefined);
}
