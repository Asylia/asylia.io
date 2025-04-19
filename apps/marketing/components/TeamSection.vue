<template>
  <section v-motion-slide-visible-bottom class="mt-20  ">

    <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
      <div></div>
      <div class="">
        <h2 class="text-3xl text-center md:text-left font-bold  text-slate-800 dark:text-white md:text-4xl">
          {{ $t('team.title') }}
        </h2>
        <p class="italic text-center md:text-left text-slate-600 dark:text-gray-500 mt-4 text-base md:text-lg">
          {{ $t('team.q1') }}
        </p>
      </div>
    </div>

    <div class="grid w-full mt-12 lg:grid-cols-[240px_1fr] gap-2 lg:gap-8 md:auto-rows-fr">

      <div class="flex flex-col pb-4 md:pb-0 items-center md:items-start justify-center h-full space-y-2">
        <div class="flex flex-col items-center space-y-2">
          <img
              src="/images/team/david-zita.jpg"
              alt="Dávid Zita"
              class="w-28 h-28 rounded-full object-cover md:w-48 md:h-48"
          />
          <p class="text-xl mt-2 font-bold text-slate-600 dark:text-gray-100 md:text-2xl">
            <span> Dávid Zita</span>
          </p>
          <div class=" flex items-center space-x-2">
            <font-awesome :icon="['fab', 'instagram']"
                          class="dark:text-gray-300 text-xl hover:cursor-pointer hover:text-primary"
            />
          </div>
        </div>
      </div>

      <div class="text-slate-600 dark:text-gray-400   text-base text-center md:text-left md:text-lg">
        <p v-html="$t('team.member1.p')" class="m3-2"></p>
        <blockquote v-html="$t('team.member1.q')"
                    class="border-l-4 border-yellow-600 pl-4 italic my-4 text-slate-800 dark:text-gray-300"></blockquote>
        <p v-html="$t('team.member1.p2')" class="m3-2"></p>
      </div>
    </div>

  </section>
</template>