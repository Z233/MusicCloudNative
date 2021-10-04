import React, { Children } from "react"
import { View, ViewStyle } from "react-native"


export const ColumnsLayout = (props: React.PropsWithChildren<{columns: number; style?: ViewStyle}>) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          ...props.style
        }}>
        {Children.map(props.children, (x, i) => (
          <View style={{
            width: 100 / props.columns + '%',
            paddingRight: (i % props.columns) < props.columns - 1 ? 4 : 0,
            paddingLeft: (i % props.columns) > 0 ? 4 : 0
          }}>
            {x}
          </View>
        ))}
      </View>
    )
  }