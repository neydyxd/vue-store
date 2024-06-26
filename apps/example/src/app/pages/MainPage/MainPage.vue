<template>
  <layout v-if="dataCount !== 0">
    <Table :loading="loading" @set-filter="handleSetFilter" @page-changed="handlePageChanged"
      @items-per-page-changed="handleItemsPerPageChanged" :data="comments" :columns="headers"
      :toggleValues="[5, 10, 15]" :count="dataCount" />
    <ErrorAlert ref="notificationRef" />
  </layout>
</template>

<script lang="ts">
import Layout from '../../components/Layout/Layout.vue';
import { getCommentsWithPagination, getAllComments } from "../../../api/comments/index"
import { Table, ErrorAlert } from "@store/libs"
import { defineComponent } from 'vue';
import type { AxiosError } from 'axios';
import { debounce } from 'lodash';
const searchParams = new URLSearchParams(window.location.search);

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
  components: { Table, Layout, ErrorAlert },
  data() {
    return {
      comments: [],
      headers: headers,
      currentPage: Number(searchParams.get('page')) || 1,
      itemsPerPage: Number(searchParams.get('rows')) || 5,
      loading: false,
      field: '',
      value: '',
      dataCount: 0,
    };
  },
  methods: {
    debouncedSetFilter: debounce(function (field, value) {
      console.log(field, value)
    }, 1000),
    handlePageChanged(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      const query = { ...this.$route.query };
      query.page = String(page);
      query.rows = String(itemsPerPage);
      this.$router.push({ query });
    },
    handleItemsPerPageChanged(page, itemsPerPage) {
      this.currentPage = page;
      this.itemsPerPage = itemsPerPage;
      const query = { ...this.$route.query };
      query.page = String(page);
      query.rows = String(itemsPerPage);
      this.$router.push({ query });
    },
    handleSetFilter(field, value) {
      this.field = field;
      this.value = value
    },
  },
  mounted() {
    getAllComments()
      .then(({ data }) => {
        this.dataCount = data.length;
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching comments:", error);
        this.$refs.notificationRef.notify("Что-то пошло не так");
      })
  },
  watch: {
    currentPage: {
      handler(newValue) {
        console.log(newValue)
        this.loading = true;
        this.comments = [];
        getCommentsWithPagination(newValue - 1, this.itemsPerPage)
          .then(({ data }) => {
            this.comments = data;
          })
          .catch((error: AxiosError) => {
            console.error("Error fetching comments:", error);
            this.$refs.notificationRef.notify("Что-то пошло не так");
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
            this.$refs.notificationRef.notify("Что-то пошло не так");
          })
          .finally(() => this.loading = false)
      },
      immediate: true
    },
    field(newField) {
      this.debouncedSetFilter(newField, this.value);
    },
    value(newValue) {
      this.debouncedSetFilter(this.field, newValue);
    }
  },
});

</script>
