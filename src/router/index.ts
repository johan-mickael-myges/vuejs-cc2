import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Posts from '../views/Post/Posts.vue';
import UserPosts from '../views/Post/UserPosts.vue';
import PostDetail from "../views/Post/PostDetail.vue";
import Albums from "../views/Album/Albums.vue";
import UserAlbums from "../views/Post/UserAlbums.vue";
import AlbumPhotos from "../views/Album/AlbumPhotos.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/posts', component: Posts },
    { name: 'post-show', path: '/posts/:id', component: PostDetail },
    { name: 'user-posts', path: '/users/:userId/posts', component: UserPosts },
    { name: 'albums', path: '/albums', component: Albums },
    { name: 'album-photos', path: '/album/:id/photos', component: AlbumPhotos },
    { name: 'user-albums', path: '/users/:userId/albums', component: UserAlbums }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
