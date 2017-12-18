<?php

Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('register', 'AuthController@register');

Route::get('recipes/search', 'RecipeController@search');
Route::resource('recipes', 'RecipeController');

Route::resource('user', 'UserController');
