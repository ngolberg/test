<template>
	<div class="recipe__list">
		<div class="recipe__item" v-for="recipe in recipes">
			<router-link class="recipe__inner" :to="`/recipes/${recipe.id}`">
				<img :src="`/images/${recipe.image}`" v-if="recipe.image">
				<p class="recipe__name">{{recipe.name}}</p>
			</router-link>
		</div>
		<div class="no_results" v-if="!recipes.length">
			{{message}}
		</div>
	</div>
</template>
<script type="text/javascript">
	import { get } from '../../helpers/api'
	export default {
		data() {
			return {
				recipes: [],
				message: 'Searching...'
			}
		},
    computed: {
      query: function () {
        return this.$route.params.query
      },
    },
    watch: {
      query: function (newQuery) {
        get(`/api/recipes/search/?query=${newQuery}`)
          .then((res) => {
            this.recipes = res.data.recipes
						if (!this.recipes.length) this.message = 'No Results'
          })
      }
    },
		created() {
			get(`/api/recipes/search/?query=${this.$route.params.query}`)
				.then((res) => {
					this.recipes = res.data.recipes
          if (!this.recipes.length) this.message = 'No Results'
				})
		}
	}
</script>
