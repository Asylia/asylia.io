<template>
  <component :is="iconComponent" :style="iconStyle" />
</template>

<script setup lang="ts">
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
/*
 * LIGHT icon pack
 */
import FasComputerMouseScrollwheel from '@shared/components/ui/font-awesome/light/ComputerMouseScrollwheel.vue';
import FalLockKeyhole from '@shared/components/ui/font-awesome/light/LockKeyhole.vue';
import FalArrowUp from '@shared/components/ui/font-awesome/light/ArrowUp.vue';
/*
 * BRANDS icon pack
 */
import FabGithub from '@shared/components/ui/font-awesome/brands/Github.vue';
import FabXTwitter from '@shared/components/ui/font-awesome/brands/XTwitter.vue';
import FabMedium from '@shared/components/ui/font-awesome/brands/Medium.vue';
import FabInstagram from '@shared/components/ui/font-awesome/brands/Instagram.vue';
import FabGitlab from '@shared/components/ui/font-awesome/brands/Gitlab.vue';
import FabLinkedin from '@shared/components/ui/font-awesome/brands/Linkedin.vue';
import FabBitcoin from '@shared/components/ui/font-awesome/brands/Bitcoin.vue';

type IconPack = 'fas' | 'fal' | 'fab';
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
  fas: {
    'file-import': FasFileImport,
    'shield-plus': FasShieldPlus,
    globe: FasGlobe,
    plus: FasPLus,
    minus: FasMinus,
    key: FasKey,
    check: FasCheck,
    xmark: FasXmark,
    'angle-down': FasAngleDown,
    'angle-up': FasAngleUp,
    'circle-xmark': FasCircleXmark,
    'circle-check': FasCircleCheck,
    user: FasUser,
    'shield-keyhole': FasShieldKeyhole,
  },
  fal: {
    'computer-mouse-scrollwheel': FasComputerMouseScrollwheel,
    'lock-keyhole': FalLockKeyhole,
    'arrow-up': FalArrowUp,
  },
  fab: {
    github: FabGithub,
    'x-twitter': FabXTwitter,
    medium: FabMedium,
    instagram: FabInstagram,
    gitlab: FabGitlab,
    linkedin: FabLinkedin,
    bitcoin: FabBitcoin,
  },
};

const iconComponent = computed(() => {
  const [pack, name] = props.icon;
  return ICONS_LIST[pack]?.[name] ?? null;
});

const attrs = useAttrs();

const iconSize = computed(() => {
  const classAttr = (attrs.class as string) ?? '';
  const classes = classAttr.split(/\s+/);
  const regex = /^text-(\d+[a-zA-Z%]*)$/;
  const found = classes.find((c) => regex.test(c));
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
