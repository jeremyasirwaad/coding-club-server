export default {
  routes: [
    {
      method: 'POST',
      path: '/bot/assign-roles',
      handler: 'bot.assignRoles',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
