<script>
import pagination from "laravel-vue-pagination"

export default {
  components: { pagination },
  props: {
    records: {
      type: Object,
      default: () => ({
        total: 0
      })
    },
    page: {
      type: Number,
      default: 1
    },
    length: {
      type: [String, Number],
      default: 15
    },
    perPage: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    updateValue(e) {
      this.$emit("update:length", e.target.value)
    },
    getRecords(page) {
      this.$emit("update:page", page)
    }
  },
}
</script>
<template>
  <div class="row">
    <div :class="{'col-md-8': perPage, 'col-md-12 d-flex justify-content-end mb-2': !perPage}">
      <pagination
        :data="records"
        :limit="1"
        class="pagination-separated m-l-10"
        @pagination-change-page="getRecords"
      />
    </div>
    <div
      v-if="records.total && perPage"
      class="col-md-4"
    >
      <div class="pull-right m-r-10">
        <select
          :value="length"
          class="form-control"
          name="page_length"
          @change="updateValue"
        >
          <option
            v-for="option in $cfg('pagination')"
            :key="option"
            :value="option"
          >
            {{ option }} на стр.
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
