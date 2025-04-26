import { computed } from 'vue';

const COLOR_MODE_KEYS = {
  DARK: 'dark',
  LIGHT: 'light',
};

const appColorMode = () => {
  const colorMode = useColorMode();

  const isDark = computed({
    get: () => colorMode.value === COLOR_MODE_KEYS.DARK,
    set: (v) => (colorMode.preference = v ? COLOR_MODE_KEYS.DARK : COLOR_MODE_KEYS.LIGHT),
  });

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  return {
    colorMode,
    toggleDark,
    isDark,
  };
};

export default appColorMode;
