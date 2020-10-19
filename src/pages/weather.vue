<template>
  <q-page class="flex column green-bg animation-fade-in" :class="bgClass">
    <!-- search -->
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        @keyup.enter="getWeatherData('city', search)"
        placeholder="Type City or Nation Name"
        dark
        borderless
      >
        <template v-slot:before>
          <q-icon name="location_city" />
        </template>

        <template v-slot:hint>
          Field hint
        </template>

        <template v-slot:append>
          <q-btn @click="getWeatherData('city', search)" round dense flat icon="search" />
        </template>
      </q-input>
    </div>
    <template v-if="weatherData">
      <!-- display -->
      <div class="col text-white text-center animation-fade-in">
        <div class="text-h4 text-weight-light weather-desc">
          {{ weatherData.name }}
          <div class="text-h6 text-weight-light">
            {{ weatherData.weather[0].main }}
          </div>
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h3 relative-position degree">&deg;c</span>
        </div>
      </div>
      <!-- weather image -->
      <div class="col text-center animation-fade-in">
        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
      </div>
    </template>
    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h3 text-weight-thin">
          Weather App
        </div>
        <q-btn class="col" @click="getUserLocation">
          <q-icon left size="3rem" name="my_location"></q-icon>
          <div>自動尋找我的位置</div>
        </q-btn>
      </div>
    </template>
    <!-- bg image -->
    <div class="col town"></div>
  </q-page>
</template>

<script>
import { QSpinnerRings, Dialog } from 'quasar'

export default {
  name: 'Weather',

  data () {
    return {
      search: '',
      weatherData: null,
      lat: null,
      long: null,
      api: '',
      apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
      apiKey: '8560b79eed51d63710f73068c3a45d58'
    }
  },

  computed: {
    bgClass () {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith('n')) {
          return 'bg-night'
        } else {
          return 'bg-day'
        }
      }
      return ''
    }
  },

  created () {
    this.initialData()
  },

  methods: {
    initialData () {
      this.search = ''
    },

    getUserLocation () {
      this.$q.loading.show({
        spinner: QSpinnerRings,
        backgroundColor: 'black'
      })
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.long = position.coords.longitude
          this.getWeatherData('position', this.lat, this.long)
        })
      } else {
        console.log('很抱歉，目前無法取得你的經緯度位置，請檢查網路連線狀況，謝謝。')
        this.$q.loading.hide()
      }
    },

    getWeatherData (type, item, subItem) {
      this.$q.loading.show({
        spinner: QSpinnerRings,
        backgroundColor: 'primary'
      })
      if (type === 'position') {
        // 透過經緯度查詢
        this.api = `${this.apiUrl}?lat=${item}&lon=${subItem}&units=metric&appid=${this.apiKey}`
      } else {
        // 透過城市名 || 國家名
        this.api = `${this.apiUrl}?q=${item}&units=metric&appid=${this.apiKey}`
      }
      this.$axios.get(this.api).then((res) => {
        console.log(type, res.data)
        this.weatherData = res.data
      }).catch((err) => {
        if (err) {
          Dialog.create({
            message: '很抱歉，名稱輸入不正確'
          })
        }
      })
      this.initialData()
      this.$q.loading.hide()
    }
  }
}
</script>

<style lang="scss">
  .degree {
    top: -45px;
  }
  .town {
    flex: 0 0 200px;
    margin-top: 16px;
    background: url('../assets/images/town.png') no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
  }
  .bg-day {
    background: linear-gradient(to right, #0083B0, #00B4DB);
  }
  .bg-night {
    background: linear-gradient(to right, #232526, #414345);
  }
</style>
