<template>
	<div class="user__show">
		<div class="user__row">
			<div class="user__details">
				<div class="user__details_inner">
					<h1 class="user__title">{{user.name}}</h1>
					<p class="user__description">E-mail: {{user.email}}</p>
					<p class="user__description">Created at: {{user.created_at}}</p>
					<div v-if="(authState.api_token && authState.user_id === id) || authState.admin">
						<router-link :to="`/users/${user.id}/edit`" class="btn btn-primary">
							Edit
						</router-link>
						<button class="btn btn__danger" @click="remove" :disabled="isRemoving">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Auth from '../../store/auth'
	import Flash from '../../helpers/flash'
	import { get, del } from '../../helpers/api'
	export default {
		data() {
			return {
				authState: Auth.state,
				isRemoving: false,
				user: {},
				id: null
			}
		},
    computed: {
      itemId: function () {
        return this.$route.params.id
      },
    },
    watch: {
      itemId: function (newId) {
        get(`/api/user/${newId}`)
          .then((res) => {
            this.user = res.data.user
          })
      }
    },
		created() {
			get(`/api/user/${this.$route.params.id}`)
				.then((res) => {
					this.user = res.data.user
				})
		}
	}
</script>
