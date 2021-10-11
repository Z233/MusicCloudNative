import { Ref } from "./webfx";
import { useMemo } from "react";
import { useWebfxRef } from "./webfxForReact";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export function useScreenState() {
    return useMemo(() => new ScreenState(), []);
}

export class ScreenState {
    private isOffsetTopRef = new Ref(true);
    useIsOffsetTop() { return useWebfxRef(this.isOffsetTopRef)!; }

    getOnScroll() {
        return (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetY = e.nativeEvent.contentOffset.y
            const isTop = offsetY <= 0;
            this.isOffsetTopRef.setIfChanged(isTop);
        };
    }
}

export type ScreenProps<T = {}> = { screenState: ScreenState } & T;
