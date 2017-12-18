<template>
	<div class="user">
		<div class="user__header">
			<h3>Users list</h3>
			<div v-if="authState.admin">
				<button class="btn" @click="$router.push(`/user/create`)">Create a new user</button>
			</div>
		</div>
		<div class="user__list">
			<div class="user__item" v-for="user in users">
				<router-link class="user__inner" :to="`/user/${user.id}`">
					<p class="user__name">{{user.name}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { get } from '../../helpers/api'
  import Auth from '../../store/auth'
	export default {
		data() {
			return {
				users: [],
        authState: Auth.state
			}
		},
		created() {
			get('/api/user')
				.then((res) => {
					this.users = res.data.users
				})
		}
	}
</script>
