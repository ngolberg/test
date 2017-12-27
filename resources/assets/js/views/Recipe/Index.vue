<template>
	<div>
		<div class="recipe__list">
			<div class="recipe__item" v-for="recipe in recipes">
				<router-link class="recipe__inner" :to="`/recipes/${recipe.id}`">
					<img :src="`/images/${recipe.image}`" v-if="recipe.image">
					<p class="recipe__name">{{recipe.name}}</p>
				</router-link>
			</div>
		</div>
		<pagination :paginationProp="pagination" :base_url="base_url" :base_request_url="base_request_url" @update="updateResource"></pagination>
	</div>
</template>
<script type="text/javascript">
	import { get } from '../../helpers/api'
  import Pagination from '../../components/Pagination.vue'

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
				recipes: []
			}
		},
    components: {
      Pagination
    },
    computed: {
      base_url: function () {
        return '/'
      },
      base_request_url: function () {
        return '/api/recipes/'
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
    methods: {
      updateResource(data){
        this.recipes = data.recipes.data
        this.pagination = data.pagination
      }
    }
	}
</script>
