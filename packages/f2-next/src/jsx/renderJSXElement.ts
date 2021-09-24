import JSX from './interface';
import { map } from '../util';

// 主要是把function节点，全部转换成string标签节点
function renderJSXElement(element: JSX.Element, otherProps: any): JSX.Element {
  if (!element) return element;
  const { type, key, ref, props, _cache = {} } = element;

  // render children first
  const children = map(props.children, (child: JSX.Element) => {
    return renderJSXElement(child, otherProps);
  });

  // combo otherProps
  element = {
    type,
    key,
    ref,
    _cache,
    props: {
      ...otherProps,
      ...props,
      children,
    },
  };

  if (typeof type === 'function') {
    const newElement = type({
      key,
      ...element.props
    });
    if (!newElement) return newElement;
    // recursive render until type is string
    return renderJSXElement({
      ...newElement,
      // 保留原始的key和ref
      key: key !== undefined ? key : newElement.key,
      ref: ref !== undefined ? ref : newElement.ref,
    }, null);
  }
  // return element if type is string
  return element;
}

export default (element: JSX.Element, props?: any) => {
  return renderJSXElement(element, props);
}
