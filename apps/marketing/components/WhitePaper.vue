<template>
  <div id="white-paper-start" class="relative">
    <UContainer>
      <section id="white-paper-section" class="relative">
        <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
          <aside class="hidden lg:block sticky self-start top-6 pt-16 pr-2 h-screen">
            <ul class="space-y-3">
              <li v-for="item in toc" :key="item.id">
                <a :href="`#${item.id}`"
                   :class="[
                  'block transition-colors duration-150 hover:text-yellow-600',
                  activeSection === item.id ? 'text-yellow-600' : ''
                 ]"
                   @click.prevent="scrollToSection(item.id)"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </aside>

          <article
              ref="content"
              class="scroll-smooth flex flex-col w-full mx-auto px-4 lg:px-6 pt-8 lg:pt-16 text-slate-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">

<!--            &lt;!&ndash; Mobile navigation dropdown (only on small screens) &ndash;&gt;-->
<!--            <div class="block lg:hidden mb-6">-->
<!--              <select-->
<!--                  class="w-full p-2 border rounded text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-800"-->
<!--                  @change="(e) => scrollToSection(e.target.value)"-->
<!--              >-->
<!--                <option disabled>Jump to section</option>-->
<!--                <option v-for="item in toc" :key="item.id" :value="item.id">-->
<!--                  {{ item.label }}-->
<!--                </option>-->
<!--              </select>-->
<!--            </div>-->

            <!-- Title and logo section -->
            <div v-motion-slide-visible-bottom class="flex hover:cursor-pointer space-x-4 items-center">
              <Logo class="w-8 lg:w-12 text-slate-700 dark:text-primary h-auto"/>
              <div class="flex flex-col">
                <div class="text-2xl lg:text-4xl text-primary dark:text-gray-300 font-bold">
                  {{ $t('white_paper_content.title') }}
                </div>
                <div class="mt-1 pl-2 text-xs lg:text-sm italic text-slate-800 dark:text-gray-400">
                  &ldquo;Arx, Imperium, Ostium&rdquo;– {{ $t('arx_imperium_ostium') }}
                </div>
              </div>
            </div>

            <!-- Sections -->
            <section v-motion-slide-visible-bottom id="wp-0" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp0.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p v-html="$t('white_paper_content.wp0.p1')"></p>

              <table class="table-auto border-collapse mt-6 w-full text-xs lg:text-sm">
                <tbody>
                <tr>
                  <td v-html=" $t('white_paper_content.wp0.table.item1.key')" class="font-semibold pr-4"></td>
                  <td class="text-right text-yellow-300 hover:underline hover:cursor-pointer">
                    <a v-html="$t('white_paper_content.wp0.table.item1.value')" href="https://github.com/Asylia"
                       target="_blank"></a>
                  </td>
                </tr>
                <tr>
                  <td v-html="$t('white_paper_content.wp0.table.item2.key')" class="font-semibold pr-4"></td>
                  <td class="text-right text-yellow-300 hover:underline hover:cursor-pointer">
                    <a v-html="$t('white_paper_content.wp0.table.item2.value')" href="https://poc.asylia.io"
                       target="_blank"></a>
                  </td>
                </tr>
                <tr>
                  <td v-html="$t('white_paper_content.wp0.table.item3.key')" class="font-semibold pr-4"></td>
                  <td v-html="$t('white_paper_content.wp0.table.item3.value')" class="text-right"></td>
                </tr>
                </tbody>
              </table>
            </section>

            <section v-motion-slide-visible-bottom id="wp-1" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp1.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p v-html="$t('white_paper_content.wp1.p1')"></p>
            </section>

            <section v-motion-slide-visible-bottom id="wp-2" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp2.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p v-html="$t('white_paper_content.wp2.p1')"></p>
            </section>

            <section v-motion-slide-visible-bottom id="wp-3" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp3.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p><strong v-html="$t('white_paper_content.wp3.list1.title')"></strong></p>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp3.list1.point_1')"></li>
                <li v-html="$t('white_paper_content.wp3.list1.point_2')"></li>
                <li v-html="$t('white_paper_content.wp3.list1.point_3')"></li>
                <li v-html="$t('white_paper_content.wp3.list1.point_4')"></li>
              </ul>
              <p><strong>{{ $t('white_paper_content.wp3.list2.title') }}</strong></p>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp3.list2.point_1')"></li>
                <li v-html="$t('white_paper_content.wp3.list2.point_2')"></li>
                <li v-html="$t('white_paper_content.wp3.list2.point_3')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-4" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp4.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <h3 v-html="$t('white_paper_content.wp4.list1.title')" class="font-semibold mt-4"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html=" $t('white_paper_content.wp4.list1.point_1')"></li>
                <li v-html=" $t('white_paper_content.wp4.list1.point_2')"></li>
                <li v-html=" $t('white_paper_content.wp4.list1.point_3')"></li>
              </ul>

              <h3 v-html="$t('white_paper_content.wp4.list2.title')" class="font-semibold mt-4"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html=" $t('white_paper_content.wp4.list2.point_1')"></li>
                <li v-html=" $t('white_paper_content.wp4.list2.point_2')"></li>
              </ul>

              <h3 v-html="$t('white_paper_content.wp4.list3.title')" class="font-semibold mt-4"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html=" $t('white_paper_content.wp4.list3.point_1')"></li>
                <li v-html=" $t('white_paper_content.wp4.list3.point_2')"></li>
                <li v-html=" $t('white_paper_content.wp4.list3.point_3')"></li>
              </ul>

              <h3 v-html="$t('white_paper_content.wp4.list4.title')" class="font-semibold mt-4"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html=" $t('white_paper_content.wp4.list4.point_1')"></li>
                <li v-html=" $t('white_paper_content.wp4.list4.point_2')"></li>
              </ul>
              <h3 v-html="$t('white_paper_content.wp4.list5.title')" class="font-semibold mt-4"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html=" $t('white_paper_content.wp4.list5.point_1')"></li>
                <li v-html=" $t('white_paper_content.wp4.list5.point_2')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-5" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp5.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp5.point_1')"></li>
                <li v-html="$t('white_paper_content.wp5.point_2')"></li>
                <li v-html="$t('white_paper_content.wp5.point_3')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-6" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp6.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p class="font-semibold" v-html="$t('white_paper_content.wp6.p1')"></p>
              <div class="overflow-x-auto">
                <table class="table-auto border-collapse mt-6 w-full text-xs lg:text-sm">
                  <thead>
                  <tr>
                    <th v-html="$t('white_paper_content.wp6.table.th1')" class="font-semibold text-left"></th>
                    <th v-html="$t('white_paper_content.wp6.table.th2')" class="font-semibold text-right"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td v-html="$t('white_paper_content.wp6.table.row1.td1')"></td>
                    <td v-html="$t('white_paper_content.wp6.table.row1.td2')" class="text-right"></td>
                  </tr>
                  <tr>
                    <td v-html="$t('white_paper_content.wp6.table.row2.td1')"></td>
                    <td v-html="$t('white_paper_content.wp6.table.row2.td2')" class="text-right"></td>
                  </tr>
                  <tr>
                    <td v-html="$t('white_paper_content.wp6.table.row3.td1')"></td>
                    <td v-html="$t('white_paper_content.wp6.table.row3.td2')" class="text-right"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-6 border-l-4 border-yellow-600 pl-4">
                <p v-html="$t('white_paper_content.wp6.poc.title') " class="font-semibold"></p>
                <p v-html="$t('white_paper_content.wp6.poc.text')"></p>
              </div>
              <h3 v-html="$t('white_paper_content.wp6.legal.title')" class="font-semibold mt-6"></h3>
              <ul class="list-disc ml-4 lg:ml-6 my-2">
                <li v-html="$t('white_paper_content.wp6.legal.point1')"></li>
                <li v-html="$t('white_paper_content.wp6.legal.point2')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-7" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp7.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <ul class="list-disc ml-4 lg:ml-6 space-y-1">
                <li v-html="$t('white_paper_content.wp7.point1')"></li>
                <li v-html="$t('white_paper_content.wp7.point2')"></li>
                <li v-html="$t('white_paper_content.wp7.point3')"></li>
                <li v-html="$t('white_paper_content.wp7.point4')"></li>
              </ul>
              <p v-html="$t('white_paper_content.wp7.next')" class="mt-4 italic"></p>
            </section>

            <section v-motion-slide-visible-bottom id="wp-8" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp8.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <ul class="list-disc ml-4 lg:ml-6 space-y-1">
                <li v-html="$t('white_paper_content.wp8.point1')"></li>
                <li v-html="$t('white_paper_content.wp8.point2')"></li>
                <li v-html="$t('white_paper_content.wp8.point3')"></li>
                <li v-html="$t('white_paper_content.wp8.point4')"></li>
                <li v-html="$t('white_paper_content.wp8.point5')"></li>
                <li v-html="$t('white_paper_content.wp8.point6')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-9" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp9.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp9.point1')"></li>
                <li v-html="$t('white_paper_content.wp9.point2')"></li>
                <li v-html="$t('white_paper_content.wp9.point3')"></li>
                <li v-html="$t('white_paper_content.wp9.point4')"></li>
                <li v-html="$t('white_paper_content.wp9.point5')"></li>
              </ul>
              <p v-html="$t('white_paper_content.wp9.email')" class="text-yellow-600"></p>
            </section>

            <section v-motion-slide-visible-bottom id="wp-10" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp10.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <ul class="list-disc ml-4 lg:ml-6 my-3 lg:my-4">
                <li v-html="$t('white_paper_content.wp10.point1')"></li>
                <li v-html="$t('white_paper_content.wp10.point2')"></li>
                <li v-html="$t('white_paper_content.wp10.point3')"></li>
              </ul>
            </section>

            <section v-motion-slide-visible-bottom id="wp-11" class="mt-8 lg:mt-12 section-observe">
              <h2 v-html="$t('white_paper_content.wp11.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p v-html="$t('white_paper_content.wp11.p1')"></p>
            </section>

            <section v-motion-slide-visible-bottom id="wp-12" class="mt-8 lg:mt-12 section-observe mb-12">
              <h2 v-html="$t('white_paper_content.wp12.title')"
                  class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p v-html="$t('white_paper_content.wp12.p1')"></p>
              <blockquote v-html="$t('white_paper_content.wp12.q1')"
                          class="border-l-4 border-yellow-600 pl-4 italic my-4 lg:my-5">
              </blockquote>
              <blockquote v-html="$t('white_paper_content.wp12.q2')"
                          class="border-l-4 border-yellow-600 pl-4 italic my-4 lg:my-5">
              </blockquote>
            </section>

            <!-- Back to top button - visible only on mobile -->
            <div class="fixed bottom-4 right-4 lg:hidden">
              <button
                  @click="scrollToTop"
                  class="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>

          </article>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import Logo from "~/components/icons/logo/logo.vue";

const {t} = useI18n()

const getTocContent = () => [
  {id: 'wp-0', label: t('white_paper_content.toc.wp0')},
  {id: 'wp-1', label: t('white_paper_content.toc.wp1')},
  {id: 'wp-2', label: t('white_paper_content.toc.wp2')},
  {id: 'wp-3', label: t('white_paper_content.toc.wp3')},
  {id: 'wp-4', label: t('white_paper_content.toc.wp4')},
  {id: 'wp-5', label: t('white_paper_content.toc.wp5')},
  {id: 'wp-6', label: t('white_paper_content.toc.wp6')},
  {id: 'wp-7', label: t('white_paper_content.toc.wp7')},
  {id: 'wp-8', label: t('white_paper_content.toc.wp8')},
  {id: 'wp-9', label: t('white_paper_content.toc.wp9')},
  {id: 'wp-10', label: t('white_paper_content.toc.wp10')},
  {id: 'wp-11', label: t('white_paper_content.toc.wp11')},
  {id: 'wp-12', label: t('white_paper_content.toc.wp12')}
]

const toc = ref(getTocContent())

const content = ref<HTMLElement | null>(null)
const activeSection = ref(toc.value[0]?.id ?? 'wp-0')

function updateActiveSection() {
  const midView = window.innerHeight / 2
  let bestId = activeSection.value
  let bestDistance = Infinity

  toc.value.forEach(item => {
    const el = document.getElementById(item.id)
    if (!el) return

    const rect = el.getBoundingClientRect()
    // calc section center
    const sectionMid = rect.top + rect.height / 2
    const distance = Math.abs(sectionMid - midView)

    if (distance < bestDistance) {
      bestDistance = distance
      bestId = item.id
    }
  })

  activeSection.value = bestId
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({behavior: 'smooth', block: 'start'})
    activeSection.value = id
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, {passive: true})
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>