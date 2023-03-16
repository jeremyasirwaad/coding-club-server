import { BACKEND_URL, rest } from "../../../../../constants";
import { Routes } from 'discord-api-types/v10';
import axios from "axios"

const getImage = async (url: string) => {
  const image = await axios.get(url,  { responseType: 'arraybuffer' })
  return Buffer.from(image.data, "utf-8")
}

export default {
  async afterCreate(event: any) {
    const { result } = event
    const data = await strapi.db.query('api::event.event').findOne({
      where: {
        id: {
          $eq: result.id
        }
      },
      populate: ["important_dates", "poster"],
    });
    try {
      await rest.post(Routes.channelMessages("893577313483096151"), {
        body: {
          content: data.content,
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  custom_id: JSON.stringify({
                    id: result.id,
                    custom_id: "EventRegisterButton"
                  }),
                  style: 1,
                  label: "REGISTER"
                }
              ],
            }
          ],
        },
        files: [
          {
            data: await getImage(BACKEND_URL + result.poster.formats.large.url),
            name: result.poster.name
          }
        ]
      });
    } catch (error) {
      console.error(error);
    }
  }
}
