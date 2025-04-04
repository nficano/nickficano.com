export const useTextHover = (text, options = {}) => {
  const svgRef = ref(null);
  const cursor = ref({ x: 0, y: 0 });
  const hovered = ref(false);
  const maskPosition = ref({ cx: "50%", cy: "50%" });

  const updateCursor = (e) => {
    cursor.value = { x: e.clientX, y: e.clientY };
    watch(cursor, (newCursor) => {
      if (svgRef.value && newCursor.x !== null && newCursor.y !== null) {
        const svgRect = svgRef.value.getBoundingClientRect();
        const cxPercentage =
          ((newCursor.x - svgRect.left) / svgRect.width) * 100;
        const cyPercentage =
          ((newCursor.y - svgRect.top) / svgRect.height) * 100;
        maskPosition.value = {
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`,
        };
      }
    });
  };

  return {
    svgRef,
    cursor,
    hovered,
    maskPosition,
    updateCursor,
    text,
    ...options,
  };
};
