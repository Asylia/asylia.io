import { useBreakpoints } from '@vueuse/core';

const VIEWPORTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useBreakPoints = () => {
  const breakpoints = useBreakpoints(VIEWPORTS);

  const isMini = breakpoints.smaller('sm');
  const isMobile = breakpoints.smaller('md');
  const isDesktop = breakpoints.greaterOrEqual('md');
  const isXLarge = breakpoints.greaterOrEqual('xl');

  return {
    isMini,
    isMobile,
    isDesktop,
    isXLarge,
  };
};
