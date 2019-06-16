const createGridClass = (breakpoints) => {
  return Object.keys(breakpoints).reduce((gridClass, breakpoint, i) => {
    const widthForBreakpoint = breakpoints[breakpoint];

    if (i === 0) {
      return gridClass += `col-${breakpoint}-${widthForBreakpoint}`;
    } else {
      return gridClass += ` col-${breakpoint}-${widthForBreakpoint}`;
    }
  }, '');
};

export default createGridClass;
