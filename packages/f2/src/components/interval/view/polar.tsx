import { jsx } from '../../../index';
import { deepMix } from '@antv/util';

export default (props) => {
  const { coord, records, animation } = props;
  const { center, startAngle, endAngle, radius } = coord;

  return (
    <group
      animation={{
        appear: {
          easing: 'quadraticOut',
          duration: 450,
          // 特殊处理，appear 的动画设置在整体上
          ...(animation && animation.appear),
          clip: {
            type: 'sector',
            property: ['endAngle'],
            style: {
              x: center.x,
              y: center.y,
              startAngle,
              r: radius,
            },
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle,
            },
          },
        },
      }}
    >
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, color, shape } = item;
              return (
                <sector
                  key={key}
                  attrs={{
                    cx: center.x,
                    cy: center.y,
                    fill: color,
                    lineWidth: 1,
                    startAngle: `${xMin}rad`,
                    endAngle: `${xMax}rad`,
                    r0: yMin,
                    r: yMax,
                    ...shape,
                  }}
                  animation={deepMix(
                    {
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['x', 'y', 'startAngle', 'endAngle', 'r0', 'r'],
                      },
                    },
                    animation
                  )}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
