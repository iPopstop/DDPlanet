<template>
  <table
    :class="tableClass"
    class="table tablesorter"
  >
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th
            v-for="column in columns"
            :key="column.label"
          >
            {{ column.label }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <template v-if="data.length > 0">
        <tr
          v-for="(item, index) in data"
          :key="index"
        >
          <slot :row="item">
            <td
              v-for="(column, index) in columns"
              :key="index"
            >
              <template v-if="hasValue(item, column)">
                <template v-if="!isImage(column)">
                  {{ itemValue(item, column) }}
                </template>
                <template v-else>
                  image {{ itemValue(item, column) }}
                </template>
              </template>
            </td>
          </slot>
        </tr>
      </template>
      <template v-else>
        <slot name="info" />
      </template>
    </tbody>
  </table>
</template>
<script>
import _has from "lodash/has"

export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Колонки"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Данные"
    },
    type: {
      type: String,
      default: "",
      description: "Тип (striped - полосатая/hover - при наведении подсвечивать)"
    },
    theadClasses: {
      type: String,
      default: "",
      description: "Классы для thead"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "Классы для tbody"
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`
    }
  },
  methods: {
    hasValue(item, column) {
      let col = column.label
      if (_has(column, "key")) {
        col = column.key
      }
      return item[col.toLowerCase()] !== "undefined"
    },
    isImage(column) {
      return _has(column, "type") && column.type === "img"
    },
    itemValue(item, column) {
      let col = column.label
      if (_has(column, "key")) {
        col = column.key
      }
      return item[col.toLowerCase()]
    }
  }
}
</script>
<style>
</style>
