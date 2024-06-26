<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th>
            <v-checkbox color="blue" style="display: flex; align-items: center;"
              :indeterminate="selectedRows.length > 0 && !isAllSelected" @change="toggleAllSelection"
              v-model="isAllSelected" />
          </th>
          <th v-for="column in columns" :key="column.field">
            <div className="table__head">
              <span className="table__title">{{ column.name }}</span>
              <input className="table__input" v-if="column.filtered" type="text" v-model="column.filterValue"
                @input="handleFilterChange($event, column.field)" placeholder="Поиск...">
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length">
            <div className="spinner"></div>
          </td>
        </tr>
        <tr v-for="row in filterData" :key="row.id">
          <td style="width: 50px;">
            <v-checkbox color="blue" :value="row.id" v-model="selectedRows" />
          </td>
          <td v-for="column in columns" :key="column.field">{{ row[column.field] }}</td>
        </tr>
      </tbody>
    </v-table>
    <div className="table__footer">
      <div>
        <label className="table__lable" for="itemsPerPage">Элементов на странице:</label>
        <v-btn-toggle variant="outlined" v-model="itemsPerPage" :items="toggleValues"  mandatory
          @update:modelValue="handleItemsPerPageChange">
          <template v-for="(item) in toggleValues">
            <v-btn v-bind:value="item">{{ item }}</v-btn>
          </template>
        </v-btn-toggle>
      </div>
      <v-pagination rounded="0" className="table__pagination" v-model="currentPage" :length="length"
        @update:modelValue="handlePageChange"></v-pagination>
    </div>
  </div>
</template>

<script>
import "./theme.scss"
const searchParams = new URLSearchParams(window.location.search);
export default {
  props: {
    columns: Array,
    data: Array,
    loading: Boolean,
    toggleValues: Array,
    count: Number,
  },
  data() {
    return {
      itemsPerPage: Number(searchParams.get('rows')) || 5,
      currentPage: Number(searchParams.get('page')) || 1,
      searchQuery: '',
      filterData: [],
      filters: '',
      selectedRows: [],
      ideterminate: false,
      length: 100,

    };
  },
  mounted() {
    this.length = Math.ceil(this.count/this.itemsPerPage)
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.data;
      }

      return this.data.filter(row => {
        return this.columns.every(column => {
          const filterValue = column.filterValue.toLowerCase();
          const cellValue = String(row[column.field]).toLowerCase();
          return cellValue.includes(filterValue);
        });
      });
    },
    isAllSelected() {
      return this.selectedRows.length === this.filterData.length && this.filterData.length > 0;
    },
  },
  watch: {
    data: {
      immediate: true, // Применить немедленно при первом рендере
      handler() {
        this.applyFilters();
      }
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit('page-changed', page, this.itemsPerPage);
    },
    handleItemsPerPageChange(value) {
      this.itemsPerPage = value;
      this.length = Math.ceil(this.count/value)
      this.currentPage = 1;
      this.$emit('items-per-page-changed', this.currentPage, this.itemsPerPage);
    },
    handleFilterChange(event, field) {
      this.columns.find(col => col.field === field).filterValue = event.target.value;
      this.applyFilters();
      this.$emit('set-filter', field, event.target.value);
    },
    applyFilters() {
      this.filterData = this.data.filter(row => {
        return this.columns.every(col => {
          const filterValue = col.filterValue ? col.filterValue.toLowerCase() : '';
          const cellValue = row[col.field] ? String(row[col.field]).toLowerCase() : '';
          return cellValue.includes(filterValue);
        });
      });
    },
    toggleAllSelection() {
      if (this.isAllSelected) {
        this.selectedRows = [];
      } else {
        this.selectedRows = this.filterData.map(row => row.id);
      }
    },
  },
};
</script>
