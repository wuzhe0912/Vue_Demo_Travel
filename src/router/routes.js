const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/index.vue') },
      { path: 'news', name: 'news', component: () => import('pages/news.vue') },
      { path: 'weather', name: 'weather', component: () => import('pages/weather.vue') },
      { path: 'todo', name: 'todo', component: () => import('pages/todo.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/404.vue')
  }
]

export default routes
