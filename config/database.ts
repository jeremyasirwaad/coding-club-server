export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: '../database/database2.db',
    },
  },
});
