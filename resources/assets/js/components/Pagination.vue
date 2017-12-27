<template>
  <nav aria-label="navigation">
    <ul class="pagination">
      <li v-if="pagination.current_page > 1" class="page-item">
        <a href="#" aria-label="Previous"
           @click.prevent="changePage(pagination.current_page - 1)" class="page-link">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="page in pagesNumber"
          :class="[ page == isActive ? 'active page-item' : 'page-item']">
        <a href="#"  class="page-link"
           @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="pagination.current_page < pagination.last_page" class="page-item">
        <a href="#" aria-label="Next"  class="page-link"
           @click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script type="text/javascript">
  import { get } from '../helpers/api'
  export default {
    props: {
      paginationProp: {
        type: Object,
        default () {
          return {
            total: 0,
            per_page: 3,
            from: 1,
            to: 0,
            current_page: 1
          }
        }
      },
      base_url: {
        type: String,
        default () {
          return '/'
        }
      },
      base_request_url: {
        type: String,
        default () {
          return '/api/recipes'
        }
      }
    },
    data() {
      return {
        offset: 4,
        pagination: this.paginationProp
      }
    },
    watch: {
      paginationProp: function (newValue) {
        this.pagination = newValue
      }
    },
    computed: {
      isActive: function () {
        return this.pagination.current_page;
      },
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    },
    methods : {
      getVueItems: function(page){
        get(this.base_request_url + this.getURLSign(this.base_request_url) + 'page='+page).then((res) => {
          this.$emit('update', res.data)
        })
      },
      changePage: function (page) {
        this.pagination.current_page = page;
        this.getVueItems(page);
        if (page > 1) this.$router.push(this.base_url + this.getURLSign(this.base_url) + 'page='+page)
        else this.$router.push(this.base_url)
      },
      getURLSign: function(url) {
        if (url.indexOf('?')==-1) return '?'
        else return '&'
      }
    }
  }
</script>
