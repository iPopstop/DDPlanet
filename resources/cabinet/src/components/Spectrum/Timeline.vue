<template>
  <ul class="timeline timeline-simple">
    <li
      v-for="row in data"
      class="timeline-inverted"
    >
      <div :class="['timeline-badge', row.type]">
        <i class="tim-icons icon-bag-16" />
      </div>
      <div class="timeline-panel">
        <div class="timeline-heading">
          <span class="badge badge-danger">{{ row.title }}</span>
        </div>
        <div class="timeline-body">
          <p>{{ row.text }}</p>
        </div>
        <div class="timeline-footer">
          <h6><i class="ti-time" /> {{ row.date }} </h6>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>

export default {
  name: "base-timeline",
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Данные"
    }
  }
}
</script>
<style>
</style>
