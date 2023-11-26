type Item = {
  id: number;
  element: JSX.Element;
}

export function sliderHelpers (
  getElement: (key: number, index: number) => JSX.Element,
  getPlug: (key: number) => JSX.Element, length: number, viewSize: number) {

  function initSliderNumber() {
    return length <= viewSize ? 0 : 1;
  }

  function selectElement(index: number, size: number) {
    return index < size ? getElement(index + 1, index) : getPlug(index + 1);
  }

  function initItems (indexes: number[]) {
    const isShort = length <= viewSize;
    return isShort ? new Array(viewSize).fill({}).map((_, index) =>
      ({id: index + 1, element: selectElement(index, length)})) :
      indexes.map((value, index) =>
        ({id: index + 1, element: getElement(index + 1, value)}));
  }

  function initIndex (index: number, size: number) {
    return index - 1 < 0 ? (index - 1 + size) % size : (index - 1) % size;
  }

  function effect (slideNumber: number, indexes: number[], items: Item[], setSlideNumber: (value: number) => void) {
    if (length <= viewSize) {
      return;
    }
    if (slideNumber !== 1) {
      indexes.forEach((value, index) => {
        indexes[index] = initIndex(value + slideNumber, length);
      });
      items.forEach((item, index) => {
        items[index] = {
          id: item.id,
          element: getElement(item.id, indexes[index])
        };
      });
      setSlideNumber(1);
    }
  }
  return {initSliderNumber, selectElement, initItems, initIndex, effect};
}
