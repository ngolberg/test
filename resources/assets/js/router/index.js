import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import RecipeIndex from '../views/Recipe/Index.vue'
import RecipeSearch from '../views/Recipe/Search.vue'
import RecipeShow from '../views/Recipe/Show.vue'
import RecipeForm from '../views/Recipe/Form.vue'
import UserIndex from '../views/User/Index.vue'
import UserShow from '../views/User/Show.vue'
import UserForm from '../views/User/Form.vue'
import NotFound from '../views/NotFound.vue'
import NoPermissions from '../views/NoPermissions.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: RecipeIndex },
		{ path: '/recipes/create', component: RecipeForm, meta: { mode: 'create' }},
		{ path: '/recipes/:id/edit', component: RecipeForm, meta: { mode: 'edit' }},
		{ path: '/recipes/:id', component: RecipeShow },
    { path: '/recipes/search/:query', component: RecipeSearch },
		{ path: '/register', component: Register },
		{ path: '/login', component: Login },
    { path: '/users', component: UserIndex },
    { path: '/user/create', component: UserForm, meta: { mode: 'create' }},
    { path: '/user/:id/edit', component: UserForm, meta: { mode: 'edit' }},
    { path: '/user/:id', component: UserShow },
		{ path: '/not-found', component: NotFound },
    { path: '/no-permissions', component: NoPermissions },
		{ path: '*', component: NotFound }
	]
})

export default router
