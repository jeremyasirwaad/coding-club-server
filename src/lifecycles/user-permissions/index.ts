import { client } from "../.."

const deptKeys = {
    "IT": "1087449038300926076",
    "CSE": "1008952325282467871",
    "ECE": "1008952350888689804",
    "EEE": "1008952372615204924",
    "MECH A": "1008952394350075914",
    "MECH B": "1087450283182931978",
    "IBT A": "1008952434091110453",
    "IBT B": "1087450384253059072",
    "PROD A": "1008952461383450634",
    "PROD B": "1087450439966003333",
    "CIVIL A": "1008952496993095761",
    "CIVIL B": "1087450518898610227",
    "EI": "1008952590131789905",
}

const batchKeys = {
    0: "1087451279313354772",
    1: "1087451232404246578",
    2: "1087451157166837902",
    3: "1087451077294686239",
}

const genderKeys = {
    "Male": "1087451946190909572",
    "Female": "1087451989429985331"
}

export const initUserPermissionsLifecycle = (strapi) => {
    strapi.db.lifecycles.subscribe({
        models: ["plugin::users-permissions.user"], 
        async afterCreate(event) {
            try {
                const { result } = event;
                const data = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: {
                        id: {
                            $eq: result.id
                        }
                    },
                    populate: ["userDetail"],
                });
                const date = new Date()
                const year = date.getFullYear()
                const {gender, batch, dept} = data.userDetail
                const rolesToAssign = [
                    genderKeys[gender],
                    batchKeys[batch - year],
                    deptKeys[dept]
                ]
                const guild = client.guilds.resolve("1008950812778704897")
                const member = await guild.members.fetch(data.discordUID)
                rolesToAssign.forEach(async (id) => {
                    let role = await guild.roles.fetch(id)
                    if(role) {
                        member.roles.add(role).catch(err => console.log(err))
                    } 
                })
            } catch (err) {
                console.log(err)
            }
        },
    });
}