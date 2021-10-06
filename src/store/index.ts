import { atom, useRecoilState } from "recoil";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export const isOffsetTopState = atom({
  key: 'isScrollState',
  default: false
})

export function getOnScroll() {
  const [isOffsetTop, setIsOffsetTop] = useRecoilState(isOffsetTopState)

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y
    if (!isOffsetTop && offsetY > 0) setIsOffsetTop(true)
    else if (isOffsetTop && offsetY <= 0) setIsOffsetTop(false)
  };

  return onScroll;
}