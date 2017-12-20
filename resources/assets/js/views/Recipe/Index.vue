<template>
	<div class="recipe__list">
		<div class="recipe__item" v-for="recipe in recipes">
			<router-link class="recipe__inner" :to="`/recipes/${recipe.id}`">
				<img :src="`/images/${recipe.image}`" v-if="recipe.image">
				<p class="recipe__name">{{recipe.name}}</p>
			</router-link>
		</div>
		<!-- Pagination -->
		<nav>
			<ul class="pagination">
				<li v-if="pagination.current_page > 1">
					<a href="#" aria-label="Previous"
						 @click.prevent="changePage(pagination.current_page - 1)">
						<span aria-hidden="true">«</span>
					</a>
				</li>
				<li v-for="page in pagesNumber"
						:class="[ page == isActived ? 'active' : '']">
					<a href="#"
						 @click.prevent="changePage(page)">@{{ page }}</a>
				</li>
				<li v-if="pagination.current_page < pagination.last_page">
					<a href="#" aria-label="Next"
						 @click.prevent="changePage(pagination.current_page + 1)">
						<span aria-hidden="true">»</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script type="text/javascript">
	import { get } from '../../helpers/api'

	export default {
		data() {
			return {
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
        },
        offset: 4,
				recipes: []
			}
		},
    computed: {
      isActived: function () {
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
    created() {
      let params = ''
			if (location.href.indexOf('?') !== false) {
			  params = location.href.substr(location.href.indexOf('?'))
			}
      get('/api/recipes' + params)
        .then((res) => {
          this.recipes = res.data.recipes.data
          this.pagination = res.data.pagination
        })
    },
    methods : {
      getVueItems: function(page){
        get('/api/recipes?page='+page).then((res) => {
          this.recipes = res.data.recipes.data
          this.pagination = res.data.pagination
        })
      },
      changePage: function (page) {
        this.pagination.current_page = page;
        this.getVueItems(page);
        if (page > 1) this.$router.push('/?page='+page)
					else this.$router.push('/')
      }
    }
	}
</script>
