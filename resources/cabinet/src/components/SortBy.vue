<script>
export default {
  name: "SortBy",
  props: {
    orderByOptions: {
      type: Array,
      default: () => (
        [
          {
            value: "created_at",
            translation: "Дата создания"
          }
        ]
      )
    },
    form: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    sortByOptions: [
      {
        value: "asc",
        translation: "По возрастанию"
      },
      {
        value: "desc",
        translation: "По убыванию"
      }
    ]
  }),
  methods: {
    updateOrder(value) {
      this.form.order = value
    },
    updateSortBy(value) {
      this.form.sort_by = value
    }
  },
  computed: {
    sortBy() {
      return this.form.sort_by ?? "created_at"
    },
    order() {
      return this.form.order ?? "asc"
    }
  }
}
</script>
<template>
  <div class="d-inline-flex">
    <a
      id="sortByLink"
      aria-expanded="false"
      aria-haspopup="true"
      class="icon mr-2 cursor-pointer"
      data-toggle="dropdown"
    >
      <feather type="sliders" />
    </a>
    <div
      aria-labelledby="sortByLink"
      class="dropdown-menu dropdown-menu-right"
    >
      <button
        v-for="option in sortByOptions"
        :key="option.value"
        class="dropdown-item icon d-flex align-items-center justify-content-between"
        @click="updateOrder(option.value)"
      >
        {{ option.translation }}
        <span
          v-if="option.value === order"
          class="pull-right"
        >
          <feather
            class="icon-xs"
            type="check"
            :size="18"
          />
        </span>
      </button>
      <div class="dropdown-divider" />
      <button
        v-for="option in orderByOptions"
        :key="option.value"
        class="dropdown-item icon d-flex align-items-center justify-content-between"
        @click="updateSortBy(option.value)"
      >
        {{ option.translation }}
        <span
          v-if="option.value === sortBy"
          class="pull-right"
        >
          <feather
            class="icon-xs"
            type="check"
            :size="18"
          />
        </span>
      </button>
    </div>
  </div>
</template>
