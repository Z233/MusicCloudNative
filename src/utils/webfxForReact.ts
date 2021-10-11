import { Callbacks, Ref, AnyFunc } from "./webfx";
import React, { useContext, useEffect, useState } from "react";

export function useWebfxRef<T>(ref: Ref<T>) {
    const [val, setVal] = useState(ref.value);
    useWebfxCallbacks(ref.onChanged, x => {
        // console.info('Ref changed', ref)
        if (val !== x.value) setVal(x.value);
    }, [ref, val]);
    return val;
}

export function useWebfxCallbacks<T extends AnyFunc>(callbacks: Callbacks<T>, cb: T, deps?: React.DependencyList) {
    useEffect(() => {
        callbacks.add(cb);
        return () => callbacks.remove(cb);
    }, deps);
}
