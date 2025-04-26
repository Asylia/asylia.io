/*

Použivam tailwind 4 a nuxt vue 3 setup. potrebujem z toho spraviť komponentu, asi to bude rozbite na viac komponent.  Mam takyto riadok je to schema 2 of 3, a podla toho čo pride cez props to musi byť schopne reakovať na lubovolnu n-of-t schemu.

              <!--              &lt;!&ndash; ============ CASE 2 ============ &ndash;&gt;-->
              <!--              &lt;!&ndash; stĺpec "#" &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-1 row-span-5 py-1 px-2 flex flex-col items-center justify-center font-medium border-l border-r border-b border-gray-300 dark:border-gray-700">-->
              <!--                <div class="text-gray-200 text-xl">2</div>-->
              <!--                <div class="text-gray-400 mt-1 text-sm">Scénar</div>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; kvórum – teraz row-span-3  &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 row-span-3 text-gray-200 py-1 px-2 flex items-center justify-center border-r border-b border-gray-300 dark:border-gray-700">-->
              <!--                Kvórum-->
              <!--              </div>-->

              <!--              &lt;!&ndash; Užívateľ – row-span-3 &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 row-span-3 text-gray-200 py-1 px-2 text-center flex items-center justify-center border-r border-b border-gray-300 dark:border-gray-700">-->
              <!--                Majitel <br/> peňaženky-->
              <!--              </div>-->

              <!--              &lt;!&ndash; k1 / aktívny &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-center border-r border-b  text-lg border-gray-300 dark:border-gray-700 flex items-center justify-center space-x-4">-->
              <!--                <span class="text text-gray-400">1</span>-->
              <!--                <font-awesome :icon="['fas','key']" class=" text-lg text-primary"/>-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-3 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-lg text-success"/>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; Funkčná – row-span-5 (zelené pozadie) &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 row-span-5 py-1 px-2 flex items-center justify-center border-r border-b border-gray-300 dark:border-gray-700 ">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-2xl text-success"/>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; k2 / aktívny &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-center border-r  border-b border-gray-300 dark:border-gray-700 text-lg flex items-center justify-center space-x-4">-->
              <!--                <span class="text text-gray-400">2</span>-->
              <!--                <font-awesome :icon="['fas','key']" class="text-lg text-primary"/>-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-3 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-lg text-success"/>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; k3 / aktívny &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-center border-r  border-b border-gray-300 dark:border-gray-700 text-lg flex items-center justify-center space-x-4">-->
              <!--                <span class="text text-gray-400">3</span>-->
              <!--                <font-awesome :icon="['fas','key']" class="text-lg text-primary"/>-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-3 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-lg text-success"/>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; n / Asylia / Vlastný backup &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-gray-200 text-center border-r border-b border-gray-300 dark:border-gray-700  flex items-center justify-center">-->
              <!--                n-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-gray-200 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                Záloha 1-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 text-lg flex items-center justify-center space-x-4">-->
              <!--                <span class="text text-gray-400">4</span>-->
              <!--                <font-awesome :icon="['fas','key']" class="text-lg text-primary"/>-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-3 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-lg text-success"/>-->
              <!--              </div>-->

              <!--              &lt;!&ndash; n / Asylia / Vlastný backup &ndash;&gt;-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-gray-200 text-center border-r border-b border-gray-300 dark:border-gray-700  flex items-center justify-center">-->
              <!--                n-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-gray-200 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                Záloha 2-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-2 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 text-lg flex items-center justify-center space-x-4">-->
              <!--                <span class="text text-gray-400">5</span>-->
              <!--                <font-awesome :icon="['fas','key']" class="text-lg text-primary"/>-->
              <!--              </div>-->
              <!--              <div-->
              <!--                  class="col-span-3 py-1 px-2 text-center border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center">-->
              <!--                <font-awesome :icon="['fas','circle-check']" class="text-lg text-success"/>-->
              <!--              </div>-->

 */
