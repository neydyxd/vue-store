<template>
  <layout>
    <Table :loading="loading" @set-filter="handleSetFilter" @page-changed="handlePageChanged"
      @items-per-page-changed="handleItemsPerPageChanged" :data="comments" :columns="headers"
      :toggleValues="[5, 10, 15]" />
  </layout>
</template>

<script lang="ts">
import Layout from '../../components/Layout/Layout.vue';
import { getCommentsWithPagination } from "../../../api/comments/index"
import { Table } from "@store/libs"
import { defineComponent } from 'vue';
import type { AxiosError } from 'axios';
import { debounce } from 'lodash';

const headers = [{
  name: "Name",
  field: 'name',
  filtered: true,
},
{
  name: "E-mail",
  field: 'email',
  filtered: false
},
]

export default defineComponent({
  components: { Table, Layout },
  data() {
    return {
      comments: [],
      headers: headers,
      currentPage: 1,
      itemsPerPage: 5,
      loading: Boolean,
      field: '',
      value: ''
    };
  },
  methods: {
    debouncedSetFilter: debounce(function (field, value) {
      console.log(field, value)
    }, 1000),
    handlePageChanged(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
    },
    handleItemsPerPageChanged(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
    },
    handleSetFilter(field, value) {
      this.field = field;
      this.value = value
    },
  },
  watch: {
    currentPage: {
      handler(newValue) {
        this.loading = true;
        this.comments = [];
        getCommentsWithPagination(newValue - 1, this.itemsPerPage)
          .then(({ data }) => {
            this.comments = data;
          })
          .catch((error: AxiosError) => {
            console.error("Error fetching comments:", error);
          })
          .finally(() => this.loading = false)
      },
      immediate: true
    },
    itemsPerPage: {
      handler(newValue) {
        this.loading = true;
        this.comments = [];
        getCommentsWithPagination(this.currentPage - 1, newValue)
          .then(({ data }) => {
            this.comments = data;
          })
          .catch((error: AxiosError) => {
            console.error("Error fetching comments:", error);
          })
          .finally(() => this.loading = false)
      },
      immediate: true
    },
    field(newField) {
      // Вызываем debouncedSetFilter при изменении поля с задержкой
      this.debouncedSetFilter(newField, this.value);
    },
    value(newValue) {
      // Вызываем debouncedSetFilter при изменении значения с задержкой
      this.debouncedSetFilter(this.field, newValue);
    }
  },
});

</script>
