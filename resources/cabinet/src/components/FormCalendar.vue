<script>
import FullCalendar from '@fullcalendar/vue'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
export default {
  components: {
    FullCalendar
  },
  props: {
    loaded: {
      type: [Array,Object],
      default: () => ([])
    },
    selectOptions: {
      type: [Function],
      default: () => ([])
    },
    clickOptions: {
      type: [Function],
      default: () => ([])
    },
    dropOptions: {
      type: [Function],
      default: () => ([])
    }
  },
  data: () => ({
    calendarOptions: {
      plugins: [ bootstrapPlugin, dayGridPlugin, interactionPlugin, timeGridPlugin],
      themeSystem: 'bootstrap',
      locale: ruLocale,
      nowIndicator: true,
      weekNumbers: true,
      selectable: true,
      editable: true,
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
      },
    },
  }),
  watch: {
    loaded: {
      handler() {
        this.calendarOptions.events = this.loaded
        this.calendarOptions.select = this.selectOptions
        this.calendarOptions.eventClick = this.clickOptions
        this.calendarOptions.eventDrop = this.dropOptions
      },
      immediate: true
    }
  }
}

</script>
<template>
  <FullCalendar
    ref="fullCalendar"
    :options="calendarOptions"
  />
</template>