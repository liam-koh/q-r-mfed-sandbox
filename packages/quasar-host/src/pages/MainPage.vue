<template>
  <div>
    <h1>Quasar Host</h1>
    <Suspense>
      <AsyncComponent res="async component1" :timout="1000" />
      <template #fallback> 로딩중... </template>
    </Suspense>
    <p>error handling</p>
    <div>
      <Transition>
        <KeepAlive>
          <Suspense>
            <AsyncComponent res="async component2" :timout="1000">
              <!-- suspensible=true: 자식컴포넌트의 suspense 별도로 작동, false: 자식컴포넌트까지 대기한뒤 컨텐츠 표시 -->
              <Suspense>
                <AsyncComponent res="async component3" :timout="2000" />
                <template #fallback> 로딩중 1... </template>
              </Suspense>
            </AsyncComponent>
            <template #fallback> 로딩중 1... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import AsyncComponent from 'src/components/AsyncComponent.vue';
</script>

<style></style>
