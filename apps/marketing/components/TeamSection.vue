<template>
  <AnimationWrapper class="mt-20">
    <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
      <div />
      <div class="">
        <div class="flex items-center justify-center md:justify-start space-x-2">
          <UIcon name="ant-design:team-outlined" class="text-primary text-3xl" />
          <h2
            class="text-3xl text-center md:text-left font-bold text-slate-800 dark:text-white md:text-4xl"
          >
            {{ $t('team.title') }}
          </h2>
        </div>
        <p
          class="italic text-center mx-auto md:text-left text-slate-600 dark:text-gray-500 mt-4 text-base md:text-lg"
        >
          {{ $t('team.q1') }}
        </p>
      </div>
    </div>

    <div class="grid w-full mt-12 lg:grid-cols-[240px_1fr] gap-2 lg:gap-8 md:auto-rows-fr">
      <div
        class="flex flex-col pb-4 md:pb-0 items-center md:items-start justify-center h-full space-y-2"
      >
        <div class="flex flex-col items-center space-y-2">
          <img
            src="/images/team/david-zita.webp"
            alt="Dávid Zita"
            loading="lazy"
            class="w-28 h-28 rounded-full object-cover md:w-48 md:h-48"
          />
          <p class="text-xl mt-2 font-bold text-slate-600 dark:text-gray-100 md:text-2xl">
            <span>Dávid Zita</span>
          </p>
          <p class="text-sm text-slate-600 dark:text-gray-300">Founder & Cto - Core dev.</p>
          <div class="flex items-center mt-3 space-x-4">
            <FontAwesomeIcon
              :icon="['fab', 'linkedin']"
              class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
              @click="openLinkedIn"
            />
            <FontAwesomeIcon
              :icon="['fab', 'gitlab']"
              class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
              @click="openGitlab"
            />
            <FontAwesomeIcon
              :icon="['fab', 'instagram']"
              class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
              @click="openInstagram"
            />
          </div>
        </div>
      </div>

      <div
        class="text-slate-600 dark:text-gray-400 leading-relaxed md:leading-loose text-base text-center md:text-left md:text-lg"
      >
        <p class="m3-2" v-html="$t('team.member1.p')" />
        <blockquote
          class="border-l-4 border-primary pl-4 italic my-4 text-slate-800 dark:text-gray-300"
          v-html="$t('team.member1.q')"
        />
        <p class="mt-7" v-html="$t('team.member1.p2')" />
      </div>
    </div>
  </AnimationWrapper>
</template>

<script setup lang="ts">
import AnimationWrapper from '~/components/AnimationWrapper.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const openInstagram = () => {
  window.open('https://www.instagram.com/davidzita.sk/', '_blank');
};

const openGitlab = () => {
  window.open('https://gitlab.com/nomadboy20', '_blank');
};

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/in/david-zita', '_blank');
};
</script>
