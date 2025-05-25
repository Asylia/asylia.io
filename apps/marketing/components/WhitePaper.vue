<template>
  <div id="white-paper-start" class="relative">
    <UContainer class="!px-0">
      <section id="white-paper-section" class="relative">
        <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
          <aside class="hidden lg:block sticky self-start top-6 pt-16 pr-2 h-screen">
            <ul class="space-y-3">
              <li v-for="item in toc" :key="item.id">
                <a
                  :href="`#${item.id}`"
                  :class="[
                    'block  md:text-lg transition-colors duration-150 hover:text-primary',
                    activeSection === item.id ? 'text-primary' : '',
                  ]"
                  @click.prevent="scrollToSection(item.id)"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </aside>

          <div
            id="wp"
            ref="content"
            class="scroll-smooth flex flex-col w-full mx-auto px-4 lg:px-6 pt-8 lg:pt-16 text-slate-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed md:leading-loose"
          >
            <AnimationWrapper>
              <div class="flex hover:cursor-pointer space-x-4 items-center">
                <Logo class="w-8 lg:w-12 text-slate-700 dark:text-primary h-auto" />
                <div class="flex flex-col">
                  <div class="text-2xl lg:text-4xl text-primary dark:text-gray-300 font-bold">
                    {{ $t('white_paper_content.title') }}
                  </div>
                  <div
                    class="mt-1 pl-2 text-xs lg:text-sm italic text-slate-800 dark:text-gray-400"
                  >
                    &ldquo;Arx, Imperium, Ostium&rdquo;– {{ $t('arx_imperium_ostium') }}
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            <WhitePaperSection id="wp" :title="$t('white_paper_content.wp.title')">
              <p class="text-base font-bold text-slate-900 dark:text-white mt-4">
                {{ $t('white_paper_content.wp.p1') }}
              </p>

              <p class="mt-4">
                {{ $t('white_paper_content.wp.p2') }}
              </p>

              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li>
                  {{ $t('white_paper_content.wp.point1') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp.point2') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp.point3') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp.point4') }}
                </li>
              </ul>

              <div class="mt-12 border-l-4 border-info pl-4">
                <p class="font-semibold text-info">
                  {{ $t('white_paper_content.wp.q1') }}
                </p>
                <p>
                  {{ $t('white_paper_content.wp.q2') }}
                </p>
              </div>

              <ul class="list-disc ml-4 lg:ml-6 mt-8 my-2">
                <li>
                  <b>
                    {{ $t('white_paper_content.wp.table.p1.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ $t('white_paper_content.wp.table.p1.p1') }}
                    </li>
                    <li>
                      {{ $t('white_paper_content.wp.table.p1.p2') }}
                    </li>
                  </ul>
                </li>
                <li>
                  <b>
                    {{ $t('white_paper_content.wp.table.p2.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ $t('white_paper_content.wp.table.p2.p1') }}
                    </li>
                    <li>
                      {{ $t('white_paper_content.wp.table.p2.p2') }}
                    </li>
                  </ul>
                </li>
                <li>
                  <b>
                    {{ $t('white_paper_content.wp.table.p3.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ $t('white_paper_content.wp.table.p3.p1') }}
                    </li>
                    <li>
                      {{ $t('white_paper_content.wp.table.p3.p2') }}
                    </li>
                  </ul>
                </li>
              </ul>

              <h2
                id="wp-visual"
                class="text-xl lg:text-xl mt-8 font-bold text-slate-900 dark:text-white mb-4"
              >
                {{ $t('white_paper_content.wp.visual.title') }}
              </h2>

              <p class="font-semibold">
                {{ $t('white_paper_content.wp.visual.p') }}
              </p>

              <div
                class="w-full mt-12 flex flex-col md:flex-row items-center justify-center md:items-start md:justify-around space-y-8 md:space-x-4"
              >
                <ClassicChestBox :keys="1">
                  <div class="text-sm mt-2 text-center font-light text-gray-400">
                    {{ $t('white_paper_content.wp.visual.b1') }}
                  </div>
                </ClassicChestBox>

                <ClassicChestBox :keys="2">
                  <div
                    class="text-sm mt-2 text-center text-gray-400"
                    v-html="$t('white_paper_content.wp.visual.b2')"
                  />
                </ClassicChestBox>

                <ClassicChestBox :keys="3">
                  <div
                    class="text-sm mt-2 text-center text-gray-400"
                    v-html="$t('white_paper_content.wp.visual.b3')"
                  />
                </ClassicChestBox>
              </div>

              <div
                class="w-full mt-12 flex flex-col md:flex-row items-center justify-center md:items-start md:justify-around space-y-8 md:space-x-4"
              >
                <MultiChestBox type="2of3">
                  <div
                    class="text-sm mt-2 text-center text-gray-400"
                    v-html="$t('white_paper_content.wp.visual.b4')"
                  />
                </MultiChestBox>

                <MultiChestBox type="3of5">
                  <div
                    class="text-sm mt-2 text-center text-gray-400"
                    v-html="$t('white_paper_content.wp.visual.b5')"
                  />
                </MultiChestBox>
              </div>

              <div class="mt-12 border-l-4 border-info pl-4">
                <p class="font-semibold text-info">
                  {{ $t('white_paper_content.wp.visual.q1') }}
                </p>
                <p>
                  {{ $t('white_paper_content.wp.visual.q2') }}
                </p>
              </div>

              <div class="flex mt-10">
                <JoinBetaButton />
              </div>

              <DetailInspectMultisigButton :scrolled-from="SCROLLED_FROM.INTRO.KEY" class="mt-8" />
            </WhitePaperSection>

            <WhitePaperSection id="wp-1" :title="$t('white_paper_content.wp1.title')">
              <p>
                {{ $t('white_paper_content.wp1.p1') }}
              </p>
            </WhitePaperSection>

            <WhitePaperSection id="wp-2" :title="$t('white_paper_content.wp2.title')">
              <p>
                {{ $t('white_paper_content.wp2.p1') }}
              </p>
            </WhitePaperSection>

            <WhitePaperSection id="wp-3" :title="t('white_paper_content.wp3.title')">
              <p>
                <strong>
                  {{ t('white_paper_content.wp3.list1.title') }}
                </strong>
              </p>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li>
                  {{ t('white_paper_content.wp3.list1.p1') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list1.p2') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list1.p3') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list1.p4') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list1.p5') }}
                </li>
              </ul>
              <p>
                <strong>
                  {{ t('white_paper_content.wp3.list2.title') }}
                </strong>
              </p>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li>
                  {{ t('white_paper_content.wp3.list2.p1') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list2.p2') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list2.p3') }}
                </li>
              </ul>
              <p>
                <strong>
                  {{ t('white_paper_content.wp3.list3.title') }}
                </strong>
              </p>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li>
                  {{ t('white_paper_content.wp3.list3.p1') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list3.p2') }}
                </li>
                <li>
                  {{ t('white_paper_content.wp3.list3.p3') }}
                </li>
              </ul>
            </WhitePaperSection>

            <WhitePaperSection id="wp-4" :title="$t('white_paper_content.wp4.title')">
              <h3 class="font-semibold mt-4">
                {{ t('white_paper_content.wp4.list1.title') }}
              </h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li>
                  <b>
                    {{ t('white_paper_content.wp4.list1.p1.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p1.p1') }}
                    </li>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p1.p1') }}
                    </li>
                  </ul>
                </li>
                <li>
                  <b>
                    {{ t('white_paper_content.wp4.list1.p2.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p2.p1') }}
                    </li>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p2.p2') }}
                    </li>
                  </ul>
                </li>
                <li>
                  <b>
                    {{ t('white_paper_content.wp4.list1.p3.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p3.p1') }}
                    </li>
                    <li>
                      {{ t('white_paper_content.wp4.list1.p3.p2') }}
                    </li>
                  </ul>
                </li>
              </ul>

              <p>
                <b>
                  {{ t('white_paper_content.wp4.list1.p') }}
                </b>
              </p>
              <DetailInspectMultisigButton
                :scrolled-from="SCROLLED_FROM.POINT_4_4.KEY"
                class="mt-4"
              />

              <h3
                class="font-semibold mt-4"
                v-html="$t('white_paper_content.wp4.list2.title')"
              />
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html="$t('white_paper_content.wp4.list2.point_1')"/>
                <li v-html="$t('white_paper_content.wp4.list2.point_2')"/>
              </ul>

              <h3
                class="font-semibold mt-4"
                v-html="$t('white_paper_content.wp4.list3.title')"
              />
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html="$t('white_paper_content.wp4.list3.point_1')"/>
                <li v-html="$t('white_paper_content.wp4.list3.point_2')"/>
                <li v-html="$t('white_paper_content.wp4.list3.point_3')"/>
              </ul>

              <h3
                class="font-semibold mt-4"
                v-html="$t('white_paper_content.wp4.list4.title')"
              />
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li>
                  <b>
                    {{ $t('white_paper_content.wp4.list4.p1.title') }}
                  </b>
                  <ul>
                    <li>
                      {{ $t('white_paper_content.wp4.list4.p1.p1') }}
                    </li>
                    <li>
                      {{ $t('white_paper_content.wp4.list4.p1.p2') }}
                    </li>
                  </ul>
                </li>
                <li>
                  {{ $t('white_paper_content.wp4.list4.p1.p3') }}
                </li>
              </ul>
              <h3
                class="font-semibold mt-4"
                v-html="$t('white_paper_content.wp4.list5.title')"
              />
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li>
                  {{ $t('white_paper_content.wp4.list5.p1') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp4.list5.p2') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp4.list5.p3') }}
                </li>
              </ul>
            </WhitePaperSection>

            <WhitePaperSection id="wp-5" :title="$t('white_paper_content.wp5.title')">
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li>
                  {{ $t('white_paper_content.wp5.point1') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp5.point2') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp5.point3') }}
                </li>
                <li>
                  {{ $t('white_paper_content.wp5.point4') }}
                </li>
              </ul>
            </WhitePaperSection>

            <WhitePaperSection id="wp-6" :title="$t('white_paper_content.wp6.title')">
              <p class="font-semibold" v-html="$t('white_paper_content.wp6.p1')"/>
              <div class="overflow-x-auto">
                <table class="table-auto border-collapse mt-6 w-full text-xs lg:text-sm">
                  <thead>
                    <tr>
                      <th
                        class="font-semibold py-1 text-left"
                        v-html="$t('white_paper_content.wp6.table.th1')"
                      />
                      <th
                        class="font-semibold py-1 text-right"
                        v-html="$t('white_paper_content.wp6.table.th2')"
                      />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="py-1" v-html="$t('white_paper_content.wp6.table.row1.td1')"/>
                      <td
                        class="text-right py-1"
                        v-html="$t('white_paper_content.wp6.table.row1.td2')"
                      />
                    </tr>
                    <tr>
                      <td class="py-1" v-html="$t('white_paper_content.wp6.table.row2.td1')"/>
                      <td
                        class="text-right py-1"
                        v-html="$t('white_paper_content.wp6.table.row2.td2')"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-12 border-l-4 border-amber-600 pl-4">
                <p
                  class="font-semibold text-amber-600"
                  v-html="$t('white_paper_content.wp6.poc.title')"
                />
                <p v-html="$t('white_paper_content.wp6.poc.text')"/>
              </div>
            </WhitePaperSection>

            <WhitePaperSection id="wp-7" :title="$t('white_paper_content.wp7.title')">
              <ul class="list-disc ml-4 lg:ml-6 space-y-1">
                <li v-html="$t('white_paper_content.wp7.point1')"/>
                <li v-html="$t('white_paper_content.wp7.point2')"/>
                <li v-html="$t('white_paper_content.wp7.point3')"/>
                <li v-html="$t('white_paper_content.wp7.point4')"/>
                <li v-html="$t('white_paper_content.wp7.point5')"/>
                <li v-html="$t('white_paper_content.wp7.point6')"/>
              </ul>
            </WhitePaperSection>

            <WhitePaperSection id="wp-8" :title="$t('white_paper_content.wp8.title')">
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp8.point1')"/>
                <li v-html="$t('white_paper_content.wp8.point2')"/>
                <li v-html="$t('white_paper_content.wp8.point3')"/>
                <li v-html="$t('white_paper_content.wp8.point4')"/>
                <li v-html="$t('white_paper_content.wp8.point5')"/>
              </ul>
              <EmailLink :dash="true" class="text-primary-700" />
            </WhitePaperSection>

            <WhitePaperSection id="wp-9" :title="$t('white_paper_content.wp9.title')">
              <p v-html="$t('white_paper_content.wp9.p1')"/>
              <p class="mt-4">
                {{ $t('white_paper_content.wp9.p2') }}
              </p>
            </WhitePaperSection>

            <WhitePaperSection id="wp-10" :title="$t('white_paper_content.wp10.title')">
              <p v-html="$t('white_paper_content.wp10.p1')"/>
              <blockquote
                class="border-l-4 border-primary pl-4 italic my-4 lg:my-5"
                v-html="$t('white_paper_content.wp10.q1')"
              />
              <blockquote
                class="border-l-4 border-primary pl-4 italic my-4 lg:my-5"
                v-html="$t('white_paper_content.wp10.q2')"
              />
            </WhitePaperSection>

            <div class="flex justify-start mt-12 mb-8">
              <JoinBetaButton />
            </div>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/images/logo/AppLogo.vue';
import JoinBetaButton from '~/components/JoinBetaButton.vue';
import EmailLink from '~/components/EmailLink.vue';
import AnimationWrapper from '~/components/AnimationWrapper.vue';
import ClassicChestBox from '~/components/ChestBox/ClassicChestBox.vue';
import MultiChestBox from '~/components/ChestBox/MultiChestBox.vue';
import DetailInspectMultisigButton from '~/components/DetailInspectMultisigButton.vue';
import { SCROLLED_FROM } from '~/components/multisigSchema/composuables';

const { t } = useI18n();

const toc = computed(() => [
  { id: 'wp-1', label: t('white_paper_content.toc.wp1') },
  { id: 'wp-2', label: t('white_paper_content.toc.wp2') },
  { id: 'wp-3', label: t('white_paper_content.toc.wp3') },
  { id: 'wp-4', label: t('white_paper_content.toc.wp4') },
  { id: 'wp-5', label: t('white_paper_content.toc.wp5') },
  { id: 'wp-6', label: t('white_paper_content.toc.wp6') },
  { id: 'wp-7', label: t('white_paper_content.toc.wp7') },
  { id: 'wp-8', label: t('white_paper_content.toc.wp8') },
  { id: 'wp-9', label: t('white_paper_content.toc.wp9') },
  { id: 'wp-10', label: t('white_paper_content.toc.wp10') },
]);

const content = ref<HTMLElement | null>(null);
const activeSection = ref(toc.value[0]?.id ?? 'wp-0');

function updateActiveSection() {
  const midView = window.innerHeight / 2;
  let bestId = activeSection.value;
  let bestDistance = Infinity;

  toc.value.forEach((item) => {
    const el = document.getElementById(item.id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // calc section center
    const sectionMid = rect.top + rect.height / 2;
    const distance = Math.abs(sectionMid - midView);

    // const DISTANCE_THRESHOLD = 20;
    // const validDistance = distance - DISTANCE_THRESHOLD < bestDistance;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestId = item.id;
    }
  });

  activeSection.value = bestId;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = id;
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection);
});
</script>
