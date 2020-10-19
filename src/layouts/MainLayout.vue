<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header__bg">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>News App</q-toolbar-title>

        <div class="language__wrap">
          <q-item-section class="language__icon">
            <q-icon name="language" />
          </q-item-section>
          語系
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import linksData from 'components/linksData.js'

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

<style lang="scss">
  .header__bg {
    background: linear-gradient(to right, #348F50, #56B4D3);
  }

  .language__wrap {
    display: flex;
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
  }

  .language__icon {
    margin-right: 6px;
  }
</style>
