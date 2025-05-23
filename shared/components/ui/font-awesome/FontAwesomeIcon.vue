<template>
  <component :is="iconComponent" :style="iconStyle" />
</template>

<script setup lang="ts">
// todo lazy loading for icons components
/*
 * SOLID icon pack
 */
import FasFileImport from '@shared/components/ui/font-awesome/solid/FileImport.vue';
import FasGlobe from '@shared/components/ui/font-awesome/solid/Globe.vue';
import FasShieldPlus from '@shared/components/ui/font-awesome/solid/ShieldPlus.vue';
import FasPLus from '@shared/components/ui/font-awesome/solid/Plus.vue';
import FasMinus from '@shared/components/ui/font-awesome/solid/Minus.vue';
import FasKey from '@shared/components/ui/font-awesome/solid/Key.vue';
import FasCheck from '@shared/components/ui/font-awesome/solid/Check.vue';
import FasXmark from '@shared/components/ui/font-awesome/solid/Xmark.vue';
import FasAngleDown from '@shared/components/ui/font-awesome/solid/AngleDown.vue';
import FasAngleUp from '@shared/components/ui/font-awesome/solid/AngleUp.vue';
import FasCircleXmark from '@shared/components/ui/font-awesome/solid/CircleXmark.vue';
import FasCircleCheck from '@shared/components/ui/font-awesome/solid/CircleCheck.vue';
import FasUser from '@shared/components/ui/font-awesome/solid/User.vue';
import FasShieldKeyhole from '@shared/components/ui/font-awesome/solid/ShieldKeyhole.vue';
import FasMobile from '@shared/components/ui/font-awesome/solid/Mobile.vue';
import FasMobileScreenButton from '@shared/components/ui/font-awesome/solid/MobileScreenButton.vue';
import SignatureLock from '@shared/components/ui/font-awesome/solid/SignatureLock.vue';
import FasArrowLeft from '@shared/components/ui/font-awesome/solid/ArrowLeft.vue';
import FasLock from '@shared/components/ui/font-awesome/solid/Lock.vue';
import FasWallet from '@shared/components/ui/font-awesome/solid/Wallet.vue';
/*
 * LIGHT icon pack
 */
import FasComputerMouseScrollwheel from '@shared/components/ui/font-awesome/light/ComputerMouseScrollwheel.vue';
import FalLockKeyhole from '@shared/components/ui/font-awesome/light/LockKeyhole.vue';
import FalArrowUp from '@shared/components/ui/font-awesome/light/ArrowUp.vue';
import FalKey from '@shared/components/ui/font-awesome/light/Key.vue';
import FalWallet from '@shared/components/ui/font-awesome/light/Wallet.vue';
import FalShieldKeyhole from '@shared/components/ui/font-awesome/light/ShieldKeyhole.vue';
import FalLock from '@shared/components/ui/font-awesome/light/Lock.vue';
import FalLockOpen from '@shared/components/ui/font-awesome/light/LockOpen.vue';
import FalKeySkeletonLeftRight from '@shared/components/ui/font-awesome/light/KeySkeletonLeftRight.vue';
import FalAngleDown from '@shared/components/ui/font-awesome/light/AngleDown.vue';
import FalAngleUp from '@shared/components/ui/font-awesome/light/AngleUp.vue';
import FalGear from '@shared/components/ui/font-awesome/light/Gear.vue';
import FalSliders from '@shared/components/ui/font-awesome/light/Sliders.vue';
/*
 * BRANDS icon pack
 */
import FabGithub from '@shared/components/ui/font-awesome/brands/Github.vue';
import FabXTwitter from '@shared/components/ui/font-awesome/brands/XTwitter.vue';
import FabMedium from '@shared/components/ui/font-awesome/brands/Medium.vue';
import FabInstagram from '@shared/components/ui/font-awesome/brands/Instagram.vue';
import FabGitlab from '@shared/components/ui/font-awesome/brands/Gitlab.vue';
import FabBitcoin from '@shared/components/ui/font-awesome/brands/Bitcoin.vue';
import FabLinkedin from '@shared/components/ui/font-awesome/brands/LinkedIn.vue';
/*
 * DUOTONE - SOLID icon pack
 */
import FadsWallet from '@shared/components/ui/font-awesome/duotone/solid/Wallet.vue';
import FadsGear from '@shared/components/ui/font-awesome/duotone/solid/Gear.vue';
import FadsHelp from '@shared/components/ui/font-awesome/duotone/solid/Help.vue';
import FadsEye from '@shared/components/ui/font-awesome/duotone/solid/Eye.vue';
/*
 * DUOTONE - REGULAR icon pack
 */
import FadrGear from '@shared/components/ui/font-awesome/duotone/regular/Gear.vue';
/*
 * DUOTONE - THIN icon pack
 */
import FadtGear from '@shared/components/ui/font-awesome/duotone/thin/Gear.vue';

const ICON_PACKS = {
  fas: 'fas',
  fal: 'fal',
  fab: 'fab',
  fads: 'fads',
  fadr: 'fadr',
  fadt: 'fadt',
};

type IconPack = keyof typeof ICON_PACKS;
type IconType = readonly [IconPack, string];

const props = defineProps<{
  icon: IconType;
}>();

type IconListTyp = {
  [key in IconPack]?: {
    [key: string]: any;
  };
};

const ICONS_LIST: IconListTyp = {
  [ICON_PACKS.fas]: {
    globe: FasGlobe,
    plus: FasPLus,
    minus: FasMinus,
    key: FasKey,
    check: FasCheck,
    xmark: FasXmark,
    user: FasUser,
    mobile: FasMobile,
    lock: FasLock,
    wallet: FasWallet,
    'angle-down': FasAngleDown,
    'angle-up': FasAngleUp,
    'circle-xmark': FasCircleXmark,
    'circle-check': FasCircleCheck,
    'shield-keyhole': FasShieldKeyhole,
    'mobile-screen-button': FasMobileScreenButton,
    'signature-lock': SignatureLock,
    'file-import': FasFileImport,
    'shield-plus': FasShieldPlus,
    'arrow-left': FasArrowLeft,
  },
  [ICON_PACKS.fal]: {
    key: FalKey,
    wallet: FalWallet,
    lock: FalLock,
    gear: FalGear,
    sliders: FalSliders,
    'angle-down': FalAngleDown,
    'angle-up': FalAngleUp,
    'computer-mouse-scrollwheel': FasComputerMouseScrollwheel,
    'lock-keyhole': FalLockKeyhole,
    'arrow-up': FalArrowUp,
    'shield-keyhole': FalShieldKeyhole,
    'lock-open': FalLockOpen,
    'key-skeleton-left-right': FalKeySkeletonLeftRight,
  },
  [ICON_PACKS.fab]: {
    github: FabGithub,
    medium: FabMedium,
    instagram: FabInstagram,
    gitlab: FabGitlab,
    linkedin: FabLinkedin,
    bitcoin: FabBitcoin,
    'x-twitter': FabXTwitter,
  },
  [ICON_PACKS.fads]: {
    wallet: FadsWallet,
    gear: FadsGear,
    help: FadsHelp,
    eye: FadsEye,
  },
  [ICON_PACKS.fadr]: {
    gear: FadrGear,
  },
  [ICON_PACKS.fadt]: {
    gear: FadtGear,
  },
};

const iconComponent = computed(() => {
  const [pack, name] = props.icon;
  return ICONS_LIST[pack]?.[name] ?? null;
});

const attrs = useAttrs();

const allowedTextSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-md',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
];

const iconSize = computed(() => {
  const classAttr = (attrs.class as string) ?? '';
  const classes = classAttr.split(/\s+/);
  const found = classes.find((c) => allowedTextSizes.includes(c));
  return found ?? 'text-base';
});

const iconStyle = computed(() => {
  const sizeClass = iconSize.value;
  const varName = '--' + sizeClass;
  return {
    height: `var(${varName})`,
    width: 'auto',
  };
});

export type { IconType, IconPack };
</script>
